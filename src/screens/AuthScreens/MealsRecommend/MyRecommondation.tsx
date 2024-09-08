import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import MyRecommondationContainer from "../../../components/organisms/MyRecommondationContainer/MyRecommondationContainer";

const MyRecommondation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MyRecommondationContainer />
    </SafeAreaView>
  );
};

export default MyRecommondation;

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
