import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import LongDistanceFlowSelector from "../../molecules/LongDistanceFlowSelector/LongDistanceFlowSelector";
import {
  VisionTestFlows,
  VisionTestFlowsActions,
} from "./LongDistanceVisionTestTypes";
import LongDistanceTestGuidence from "../../molecules/LongDistanceTestGuidence/LongDistanceTestGuidence";
import LongDinstanceVisionTest from "../../molecules/LongDistanceVisionTest/LongDinstanceVisionTest";
import TestResults from "../../molecules/TestResults/TestResults";

const LongDistanceVisionTestContainer = () => {
  const [selectedFlow, setSelectedFlow] =
    React.useState<VisionTestFlowsActions>(VisionTestFlowsActions.NONE);
  const [steps, setSteps] = React.useState<VisionTestFlows>(
    VisionTestFlows.TEST_FLOW_SELECTOR
  );

  const getTopAppBarTitle = () => {
    switch (steps) {
      case VisionTestFlows.TEST_INSTRUCTIONS:
        return "Test Instructions";
      case VisionTestFlows.TEST_FLOW_SELECTOR:
        return "Long Distance Test";
      case VisionTestFlows.TEST_SCREEN:
        return "Long Distance Test";
      case VisionTestFlows.TEST_RESULT:
        return "Test Results";
      default:
        return "Long Distance Test";
    }
  }
  return (
    <View>
      <VisionHomeScreenTopAppBar header={getTopAppBarTitle()} />

      {steps === VisionTestFlows.TEST_INSTRUCTIONS ? (
        <LongDistanceTestGuidence />
      ) : steps === VisionTestFlows.TEST_FLOW_SELECTOR ? (
        <LongDistanceFlowSelector
          setSelectedFlow={setSelectedFlow}
          setSteps={setSteps}
        />
      ) : steps === VisionTestFlows.TEST_SCREEN ? (
        <LongDinstanceVisionTest />
      ) : (
        <TestResults />
      )}
    </View>
  );
};

export default LongDistanceVisionTestContainer;

const styles = StyleSheet.create({});
