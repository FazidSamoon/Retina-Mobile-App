import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CompleteIcon from "../../../assets/CompleteIcon";
import {
  VisionTestChallenge,
  VisionTestChallengesResponse,
} from "../../../utils/types/commonTypes";

const ChallengesListView = ({
  challanges,
}: {
  challanges: VisionTestChallenge[];
}) => {
  return (
    <ScrollView style={styles.container}>
      {challanges?.map((challenge) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "10%",
            }}
          >
            <Image source={require("../../../assets/TasksIcon.png")} />
          </View>

          <View
            style={{
              width: "80%",
              paddingLeft: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                flexWrap: "wrap",
              }}
            >
              {challenge?.task}
            </Text>
            <Text>{challenge?.difficulty}</Text>
          </View>
          <View
            style={{
              width: "10%",
            }}
          >
            {challenge.status === "COMPLETED" && <CompleteIcon />}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChallengesListView;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
  },
});
