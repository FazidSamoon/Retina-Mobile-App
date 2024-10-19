import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CompleteIcon from "../../../assets/CompleteIcon";
import {
  VisionTestChallenge,
  VisionTestChallengesResponse,
} from "../../../utils/types/commonTypes";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { useNavigation } from "@react-navigation/native";

const ChallengesListView = ({
  challanges,
}: {
  challanges: VisionTestChallenge[];
}) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <ScrollView style={styles.container}>
        {challanges&& challanges?.map((challenge) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#E4F3FE",
              borderBottomWidth: 2,
              marginBottom: 15,
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
              <Text>{challenge.dificulty}</Text>
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
      <View
        style={{
          position: "absolute",
          bottom: 140,
          zIndex: 100,
          width: "100%",
          height: "10%",
        }}
      >
        <RPPrimaryButton
          buttonTitle={"Go to the leaderboard"}
          onPress={() => {
            navigation.navigate("Leaderboard");
          }}
        />
      </View>
    </View>
  );
};

export default ChallengesListView;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
    height: "80%",
  },
});
