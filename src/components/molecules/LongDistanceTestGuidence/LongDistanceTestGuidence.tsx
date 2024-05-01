import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LongDistanceTestGuidenceStepsType } from "./LongDistanceStepTypes";

const LongDistanceTestGuidenceSteps: LongDistanceTestGuidenceStepsType[] = [
  {
    step: 1,
    title: "Step 1",
    description:
      "If you are wearing glasses wear then before performing the test",
    image: "https://via.placeholder.com/150",
  },
  {
    step: 2,
    title: "Step 2",
    description: "Stand at least 2m away from the screen",
    image: "https://via.placeholder.com/150",
  },
  {
    step: 3,
    title: "Step 3",
    description:
      "Once you identified the letter pronounce the letter loud and clear before clocks ticks out",
    image: "https://via.placeholder.com/150",
  }
];

const LongDistanceTestGuidence = () => {
  const [steps, setSteps] = useState<number>(0);
  return (
    <View>
      <Text>LongDistanceTestGuidence</Text>
    </View>
  );
};

export default LongDistanceTestGuidence;

const styles = StyleSheet.create({});
