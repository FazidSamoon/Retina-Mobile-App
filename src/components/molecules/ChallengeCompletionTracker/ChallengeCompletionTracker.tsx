import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CircularProgress } from "react-native-circular-progress";

const ChallengeCompletionTracker = () => {
  return (
    <View style={styles.container}>
      <CircularProgress
        size={50}
        width={8}
        fill={20}
        tintColor={"#109BE7"}
        backgroundColor="white"
        rotation={0}
        lineCap="round"
      />
      <View style={styles.textWrapper}>
        <Text style={{
            fontSize: 18,
            fontWeight: "800"
        }}>Completion Tracker</Text>
        <Text>You almost completed 4/5 tasks</Text>
      </View>
    </View>
  );
};

export default ChallengeCompletionTracker;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#E4F3FE",
    display: "flex",
    flexDirection: "row"
  },
  textWrapper: {
    marginLeft: 20
  }
});
