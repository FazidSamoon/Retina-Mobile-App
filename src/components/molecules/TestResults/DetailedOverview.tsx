import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  VisionTestStateType,
} from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestResultSingleCard from "../VisionTestResultSingleCard/VisionTestResultSingleCard";
import { calculateVisualAcuityScoreUsingSLMAformula } from "../../../utils/common/scoreCalculations";
import { useMutation } from "@tanstack/react-query";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import axiosInstance from "../../../api/axiosConfig";
import { API_URL } from "../../../api/config";

const DetailedOverview = ({
  visionTestResults,
  leftEyeScore,
  rightEyeScore
}: {
  visionTestResults: VisionTestStateType | any;
  leftEyeScore: string,
  rightEyeScore: string
}) => {
  const getLabelsBasedOnLogmar = (logmar: number) => {
    if (logmar <= 0.1) {
      return "Normal";
    }
    if (logmar <= 0.3) {
      return "Mild";
    }
    if (logmar <= 0.5) {
      return "Moderate";
    }
    if (logmar <= 1) {
      return "Severe";
    }
    return "Blind";
  };

  const getLabelColor = (logmar: number) => {
    if (logmar <= 0.1) {
      return "green";
    }
    if (logmar <= 0.3) {
      return "lightblue";
    }
    if (logmar <= 0.5) {
      return "yellow";
    }
    if (logmar <= 1) {
      return "orange";
    }
    return "red";
  };

  return (
    <View>
      <Text style={styles.titleText}>Detailed Overview</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: Dimensions.get("window").height * 0.6,
          width: "100%",
          backgroundColor: "transparent",
        }}
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Eye Scores based on logmar values
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Left Eye: {leftEyeScore} :{" "}
              <Text
                style={{
                  color: getLabelColor(
                    parseFloat(leftEyeScore)
                  ),
                }}
              >
                {getLabelsBasedOnLogmar(
                  parseFloat(leftEyeScore)
                )}
              </Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Right Eye: {rightEyeScore} :{" "}
            <Text
              style={{
                color: getLabelColor(
                  parseFloat(rightEyeScore)
                ),
              }}
            >
              {getLabelsBasedOnLogmar(
                parseFloat(rightEyeScore)
              )}
            </Text>
          </Text>

          <Text>
            {
              "Note: The logmar score is calculated based on the last visible letter and the number of errors made"
            }
          </Text>
        </View>
        {Object.keys(visionTestResults.testResults.leftEye.result).map(
          (key) => {
            return (
              <View key={key}>
                <VisionTestResultSingleCard
                  size={key}
                  leftEyeScore={
                    visionTestResults.testResults.leftEye.result[key]
                  }
                  rightEyeScore={
                    visionTestResults.testResults.rightEye.result[key]
                  }
                />
              </View>
            );
          }
        )}
      </ScrollView>
    </View>
  );
};

export default DetailedOverview;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
