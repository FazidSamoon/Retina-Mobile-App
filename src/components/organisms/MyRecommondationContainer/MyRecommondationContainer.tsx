import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import {
  RecommendedMeal,
  setMainMeal,
  setOtherMeals,
} from "../../../store/slices/recommondationSlice";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RNSlider from "../../atoms/RNSlider/RNSlider";
import { BottomSheet } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";

const MyRecommondationContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const dispatch = useDispatch();
  const { mainMeal, otherMeals } = useSelector(
    (state: RootState) => state.recommondationReducer
  );
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<RecommendedMeal>();

  useEffect(() => {
    const defaultMainMealId = 6;
    const defaultOtherMealsIds = [14, 13, 11, 16];

    dispatch(setMainMeal(defaultMainMealId));
    dispatch(setOtherMeals(defaultOtherMealsIds));
  }, [dispatch]);

  const navigateTo = () => {
    navigation.navigate("MealsRecommend");
  };

  const onMealRatingDrawerPress = (meal: RecommendedMeal) => {
    setSelectedMeal(meal);
    setBottomSheetVisible(true);
  };

  const onPressRateMeal = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View>
      <VisionHomeScreenTopAppBar
        header="My Recommondation"
        navigateTo={navigateTo}
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

          <View
            style={{
              height: "100%",
            }}
          >
            <Text style={styles.questionText}>
              How much do you like this meal?
            </Text>

            <View style={{ marginBottom: 60, marginTop: 20 }}>
              <RNSlider />
            </View>

            <RPPrimaryButton
              buttonTitle={"Continue"}
              buttonStyle={{
                borderRadius: 30,
              }}
              onPress={() => {
                onPressRateMeal();
              }}
            />
          </View>
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
