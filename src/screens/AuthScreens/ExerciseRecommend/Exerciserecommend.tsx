import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";

const ExerciseRecommend = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const navigateTo = () => {
    navigation.navigate("RecommendHome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <VisionHomeScreenTopAppBar
        header="Exercise Recommender"
        navigateTo={navigateTo}
      />
      <View style={styles.card}>
        <Text style={styles.text}>Coming Soon</Text>
      </View>
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
  card: {
    width: "90%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
