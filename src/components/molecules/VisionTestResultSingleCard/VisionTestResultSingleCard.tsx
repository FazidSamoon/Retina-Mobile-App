import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { VisionTestStateType } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import { CircularProgress } from "react-native-circular-progress";
import { BASIC_COLORS } from "../../../utils/constants/styles";

export type VisionTestResultSingleCardProps = {
  size: string;
  leftEyeScore: number;
  rightEyeScore: number;
};
const VisionTestResultSingleCard = (data: VisionTestResultSingleCardProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "#E9F1FF",
        borderWidth: 2,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {data.size} PT letter recognition
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Text
            style={{
              color: "#848A94",
              fontSize: 14,
            }}
          >
            Left Eye: {data.leftEyeScore} / 5
          </Text>
          <Text
            style={{
              color: "#848A94",
              fontSize: 14,
            }}
          >
            Right Eye: {data.rightEyeScore} / 5
          </Text>
        </View>
      </View>

      <CircularProgress
        size={40}
        width={5}
        fill={((data.rightEyeScore + data.leftEyeScore) / 10) * 100}
        tintColor={data.rightEyeScore + data.leftEyeScore > 7 ? BASIC_COLORS.PRIMARY : data.rightEyeScore + data.leftEyeScore > 5 ? "orange" : "red"}
        backgroundColor="#E9F1FF"
        rotation={0}
        lineCap="round"
      />
    </View>
  );
};

export default VisionTestResultSingleCard;

const styles = StyleSheet.create({});
