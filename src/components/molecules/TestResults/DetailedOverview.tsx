import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { VisionTestStateType } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestResultSingleCard from "../VisionTestResultSingleCard/VisionTestResultSingleCard";
import { calculateVisualAcuityScoreUsingSLMAformula } from "../../../utils/common/scoreCalculations";

const DetailedOverview = ({
  visionTestResults,
}: {
  visionTestResults: VisionTestStateType;
}) => {
  const calculateLeftEyeLogmarScore = (): string => {
    const sortedResultsLeftEye: [string, number][] = Object.entries(
      visionTestResults.testResults.leftEye.result
    ).sort((a, b) => {
      return parseFloat(b[0]) - parseFloat(a[0]);
    });
    const leftEye = sortedResultsLeftEye.filter((item) => item[1] > 0);
    if (leftEye.length === 0) {
      return "0";
    } else {
      const leftEyeLogmarScore = calculateVisualAcuityScoreUsingSLMAformula(
        leftEye[leftEye.length - 1][0],
        5 - leftEye[leftEye.length - 1][1]
      );

      return leftEyeLogmarScore.toFixed(2);
    }
  };

  const calculateRightEyeLogmarScore = (): string => {
    const sortedResultsRightEye: [string, number][] = Object.entries(
      visionTestResults.testResults.rightEye.result
    ).sort((a, b) => {
      return parseFloat(b[0]) - parseFloat(a[0]);
    });

    const rightEye = sortedResultsRightEye.filter((item) => item[1] > 0);
    if (rightEye.length === 0) {
      return "0";
    } else {
      const rightEyeLogmarScore = calculateVisualAcuityScoreUsingSLMAformula(
        rightEye[rightEye.length - 1][0],
        5 - rightEye[rightEye.length - 1][1]
      );

      return rightEyeLogmarScore.toFixed(2);
    }
  };

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
              Left Eye: {calculateLeftEyeLogmarScore()} :{" "}
              <Text
                style={{
                  color: getLabelColor(
                    parseFloat(calculateLeftEyeLogmarScore())
                  ),
                }}
              >
                {getLabelsBasedOnLogmar(
                  parseFloat(calculateLeftEyeLogmarScore())
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
            Right Eye: {calculateRightEyeLogmarScore()} :{" "}
            <Text
              style={{
                color: getLabelColor(
                  parseFloat(calculateRightEyeLogmarScore())
                ),
              }}
            >
              {getLabelsBasedOnLogmar(
                parseFloat(calculateRightEyeLogmarScore())
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
