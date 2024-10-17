import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ExerciseRecommendContainer from "../../../components/organisms/ExerciseRecommendContainer/ExerciseRecommendContainer";

const ExerciseRecommend = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ExerciseRecommendContainer />
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
