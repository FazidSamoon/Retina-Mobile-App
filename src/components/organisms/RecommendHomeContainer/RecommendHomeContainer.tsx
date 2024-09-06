import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types"
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";

const RecommendHomeContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateToMealsScreen = () => {
    navigation.navigate("MealsRecommend");
  };

  const navigateToExerciseScreen = () => {
    navigation.navigate("ExerciseRecommend");
  };

  return (
    <View>
      <VisionHomeScreenTopAppBar header="Recommend Home" />

      <TouchableOpacity onPress={navigateToMealsScreen}>
        <Text>Meals</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToExerciseScreen}>
        <Text>Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendHomeContainer;
