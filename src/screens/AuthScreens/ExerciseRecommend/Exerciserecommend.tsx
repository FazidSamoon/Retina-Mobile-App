import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import MealsRecommendContainer from "../../../components/organisms/MealsRecommendContainer/MealsRecommendContainer";

const ExerciseRecommend = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/*  <Temporarily /> */}
      <MealsRecommendContainer />
    </SafeAreaView>
  );
};

export default ExerciseRecommend;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
});
