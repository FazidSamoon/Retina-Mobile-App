import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import WeeklyChallengesCard from "./WeeklyChallengesCard";
import MonthlyChallengesCard from "./MonthlyChallengesCard";

const ChallengesCardContainer = () => {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 30,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <WeeklyChallengesCard />
        <MonthlyChallengesCard />
      </ScrollView>
    </View>
  );
};

export default ChallengesCardContainer;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 172,
    borderRadius: 20,
    backgroundColor: "red",
    gap: 20,
    marginRight: 10,
    // padding: 20,
  },
});
