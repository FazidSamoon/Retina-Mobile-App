import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import MealInfoForm from "../../molecules/Recommondations/Meal Recommondations/MealInfoForm";

const MealsRecommendContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateTo = () => {
    navigation.navigate("RecommendHome");
  };

  return (
    <View>
      <VisionHomeScreenTopAppBar
        header="Meals Recommender"
        navigateTo={navigateTo}
      />
      <MealInfoForm />
    </View>
  );
};

export default MealsRecommendContainer;
