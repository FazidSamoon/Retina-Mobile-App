import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RNSlider from "../../atoms/RNSlider/RNSlider";
import { BottomSheet } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { Formik } from "formik";
import { recommendationActions } from "../../../utils/types/data";
import { updateQValue } from "../../../api/recommend";
import { Circle } from "react-native-animated-spinkit";

interface RecommendedMeal {
  _id: number;
  action_name: string;
}

const MyRecommondationContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const { recommendedActions, user_id } = useSelector(
    (state: RootState) => state.recommondationReducer
  );
  const [loading, setLoading] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [mainMeal, setMainMeal] = useState<RecommendedMeal | null>(null);
  const [otherMeals, setOtherMeals] = useState<RecommendedMeal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<RecommendedMeal | null>(
    null
  );

  useEffect(() => {
    const defaultMainMealId = recommendedActions.mainMealAction;
    const defaultOtherMealsIds = recommendedActions.otherMealsActions;

    setMainMeal(
      recommendationActions.find((meal) => meal._id === defaultMainMealId)
    );

    setOtherMeals(
      defaultOtherMealsIds
        .filter((id) => id !== defaultMainMealId)
        .map((id) => recommendationActions.find((meal) => meal._id === id)!)
    );
  }, [recommendedActions]);

  const navigateBack = () => {
    navigation.navigate("MealsRecommend");
  };

  const onMealRatingDrawerPress = (meal: RecommendedMeal) => {
    setSelectedMeal(meal);
    setBottomSheetVisible(true);
  };

  const formatReward = (reward: number) => {
    return parseFloat(reward.toFixed(2));
  };

  const onPressRateMeal = async (values: { reward: number }) => {
    try {
      setLoading(true);
      const formattedReward = formatReward(values.reward);

      // If the selected meal is the main meal
      if (selectedMeal?._id === mainMeal?._id) {
        // Call the API only for the main meal
        const { apiSuccess, apiError } = await updateQValue({
          state: recommendedActions.state,
          action: selectedMeal!._id,
          reward: formattedReward,
          user_id: user_id,
        });

        if (apiSuccess) {
          setLoading(false);
          showToastWithGravityAndOffset("Rating submitted successfully");
          navigation.navigate("Home");
        } else {
          setLoading(false);
          showToastWithGravityAndOffset(
            "Error occurred while submitting rating"
          );
          console.error("Error in updating Q value:", apiError);
        }
      } else {
        // If the selected meal is an other meal
        // First, update the other meal with the selected reward
        const { apiSuccess: otherMealSuccess, apiError: otherMealError } =
          await updateQValue({
            state: recommendedActions.state,
            action: selectedMeal!._id,
            reward: formattedReward,
            user_id: user_id,
          });

        if (otherMealSuccess) {
          // Second, update the main meal with a reward of -0.5
          const { apiSuccess: mainMealSuccess, apiError: mainMealError } =
            await updateQValue({
              state: recommendedActions.state,
              action: mainMeal!._id,
              reward: -0.5,
              user_id: user_id,
            });

          if (mainMealSuccess) {
            setLoading(false);
            showToastWithGravityAndOffset("Rating submitted successfully");
            navigation.navigate("Home");
          } else {
            setLoading(false);
            showToastWithGravityAndOffset(
              "Error occurred while submitting rating for main meal"
            );
            console.error(
              "Error in updating Q value for main meal:",
              mainMealError
            );
          }
        } else {
          setLoading(false);
          showToastWithGravityAndOffset(
            "Error occurred while submitting rating for other meal"
          );
          console.error(
            "Error in updating Q value for other meal:",
            otherMealError
          );
        }
      }
    } catch (error) {
      console.error("Error occurred during update q value:", error);
      showToastWithGravityAndOffset("Error occurred during rating submission");
    } finally {
      setBottomSheetVisible(false);
    }
  };

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View>
      <VisionHomeScreenTopAppBar
        header="My Recommondation"
        navigateTo={navigateBack}
      />

      {/* Main Recommendation */}
      <View style={styles.mainRecommendationContainer}>
        <Text style={styles.title}>Your Recommendation is..</Text>
        <TouchableOpacity
          style={styles.mainRecommendationCard}
          onPress={() => onMealRatingDrawerPress(mainMeal)}
        >
          <Text style={[styles.recommendationText, { fontSize: 18 }]}>
            {mainMeal?.action_name}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Other Recommendations */}
      <Text style={styles.subtitle}>Other Recommonded Meals</Text>
      <View style={styles.otherMealscontainer}>
        <FlatList
          data={otherMeals}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.otherRecommendationCard}
              onPress={() => onMealRatingDrawerPress(item)}
            >
              <Text style={styles.recommendationText}>{item?.action_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Bottom Sheet for Meal Rating */}
      <BottomSheet
        isVisible={bottomSheetVisible}
        backdropStyle={styles.backdropStyle}
        containerStyle={styles.bottomSheetContainer}
      >
        <View
          style={{
            height: "100%",
          }}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              {selectedMeal?.action_name?.length > 24
                ? selectedMeal?.action_name?.substring(0, 24) + "..."
                : selectedMeal?.action_name}
            </Text>

            <TouchableOpacity
              onPress={() => setBottomSheetVisible(false)}
              style={styles.sheetClose}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={{ marginVertical: 80, marginHorizontal: 120 }}>
              <Circle size={100} color="#109BE7" animating />
            </View>
          ) : (
            <Formik initialValues={{ reward: 0 }} onSubmit={onPressRateMeal}>
              {({ values, handleSubmit, setFieldValue }) => (
                <View style={{ height: "100%" }}>
                  <Text style={styles.questionText}>
                    How much do you like this meal?
                  </Text>

                  <View style={{ marginBottom: 60, marginTop: 20 }}>
                    <RNSlider
                      value={values.reward}
                      onValueChange={(value: number) =>
                        setFieldValue("reward", value)
                      }
                    />
                  </View>

                  <RPPrimaryButton
                    buttonTitle={"Submit Rating"}
                    buttonStyle={{
                      borderRadius: 30,
                    }}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default MyRecommondationContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainRecommendationContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
  },
  mainRecommendationCard: {
    padding: 35,
    borderRadius: 10,
    backgroundColor: BASIC_COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: BASIC_COLORS.FONT_PRIMARY,
  },
  otherMealscontainer: {
    borderRadius: 10,
    backgroundColor: BASIC_COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  otherRecommendationCard: {
    padding: 30,
    borderRadius: 12,
    backgroundColor: BASIC_COLORS.WHITE,
    marginTop: 20,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  listContainer: {
    paddingBottom: 20,
  },
  backdropStyle: {
    maxHeight: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetContainer: {
    backgroundColor: BASIC_COLORS.WHITE,
    maxHeight: "70%",
    minHeight: "70%",
    position: "absolute",
    width: "100%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    paddingVertical: 31,
    paddingHorizontal: 31,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: BASIC_COLORS.FONT_SECONDARY,
  },
  sheetClose: {
    backgroundColor: "#C4C4C4",
    borderRadius: 50,
    padding: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
});
