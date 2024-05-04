import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { VisionTestStateType } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestResultSingleCard from "../VisionTestResultSingleCard/VisionTestResultSingleCard";

const DetailedOverview = ({
  visionTestResults,
}: {
  visionTestResults: VisionTestStateType;
}) => {
  return (
    <View>
      <Text style={styles.titleText}>Detailed Overview</Text>
      <ScrollView 
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
