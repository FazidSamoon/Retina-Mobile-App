import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import PrimaryRecommondationCard from "../../molecules/Recommondations/PrimaryRecommondationCard";

const height = Dimensions.get("window").height;

const RecommendHomeContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateToMealsScreen = () => {
    navigation.navigate("MealsRecommend");
  };

  const navigateToExerciseScreen = () => {
    navigation.navigate("ExerciseRecommend");
  };

  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header="Recommend Home" />

      <View style={styles.cardsContainer}>
        <PrimaryRecommondationCard
          title="Food Recommendations"
          onPress={navigateToMealsScreen}
          backgroundSrc={{
            uri: "https://img.freepik.com/free-photo/bowl-mozzarella-balls-with-tomato-sauce-garlic-pasta-turquoise-background_23-2147922791.jpg",
          }}
        />

        <PrimaryRecommondationCard
          title="Exercise Recommendations"
          onPress={navigateToExerciseScreen}
          backgroundSrc={{
            uri: "https://img.freepik.com/free-photo/apple-energy-bar-near-sports-stuff_23-2147750783.jpg",
          }}
        />
      </View>
    </View>
  );
};

export default RecommendHomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    gap: 30,
    paddingBottom: height * 0.1,
    justifyContent: "space-between",
  },
});
