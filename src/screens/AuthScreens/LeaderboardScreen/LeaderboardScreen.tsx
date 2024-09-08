import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LeaderBoardContainer from "../../../components/organisms/LeaderBoardContainer/LeaderBoardContainer";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Leaderboard"} />
      <LeaderBoardContainer />
    </View>
  );
};

export default LeaderboardScreen;

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
