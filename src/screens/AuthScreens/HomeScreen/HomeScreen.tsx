import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../../components/molecules/Header/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Greetings from "../../../components/molecules/Greetings/Greetings";
import ChallengesCardContainer from "../../../components/molecules/ChallengesCardContainer/ChallengesCardContainer";
import CategoriesContainer from "../../../components/organisms/CategoriesContainer/CategoriesContainer";

const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <Greetings />
          <ChallengesCardContainer />
          <CategoriesContainer />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

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
