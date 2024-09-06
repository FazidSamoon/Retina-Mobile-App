import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import {
  setMainMeal,
  setOtherMeals,
} from "../../../store/slices/recommondationSlice";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const MyRecommondationContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const dispatch = useDispatch();

  const { mainMeal, otherMeals } = useSelector(
    (state: RootState) => state.recommondationReducer
  );

  useEffect(() => {
    const defaultMainMealId = 6;
    const defaultOtherMealsIds = [14, 13, 11, 16];

    dispatch(setMainMeal(defaultMainMealId));
    dispatch(setOtherMeals(defaultOtherMealsIds));
  }, [dispatch]);

  const navigateTo = () => {
    navigation.navigate("MealsRecommend");
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
        <View style={styles.mainRecommendationCard}>
          <Text style={[styles.recommendationText, { fontSize: 18 }]}>
            {mainMeal?.action_name}
          </Text>
        </View>
      </View>

      {/* Other Recommendations */}
      <Text style={styles.subtitle}>Other Recommonded Meals</Text>
      <View style={styles.otherMealscontainer}>
        <FlatList
          data={otherMeals}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.otherRecommendationCard}>
              <Text style={styles.recommendationText}>{item?.action_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
});
