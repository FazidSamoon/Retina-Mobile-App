import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import LongDistanceFlowSelector from "../../molecules/LongDistanceFlowSelector/LongDistanceFlowSelector";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "./LongDistanceVisionTestTypes";
import LongDistanceTestGuidence from "../../molecules/LongDistanceTestGuidence/LongDistanceTestGuidence";
import LongDinstanceVisionTest from "../../molecules/LongDistanceVisionTest/LongDinstanceVisionTest";
import TestResults from "../../molecules/TestResults/TestResults";
import { LongDistanceTestGuidenceSteps } from "../../../utils/types/data";
import { getCurrentWeek } from "../../../utils/common/commonUtil";
import { VisionTestStateType } from "../../molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestTestTypeSelector from "../../molecules/VisionTestTestTypeSelector/VisionTestTestTypeSelector";

const LongDistanceVisionTestContainer = () => {
  const [visionTestStates, setVisionTestStates] = useState<VisionTestStateType>(
    {
      date: new Date(),
      week: getCurrentWeek(),
      year: new Date().getFullYear(),
      testCompleted: false,
      testResults: {
        leftEye: {
          result: {
            202.6: 0,
            173.3: 0,
            144: 0,
            116: 0,
            86.6: 0,
            57.3: 0,
            44: 0,
            28: 0,
            20: 0,
            12: 0,
          },
          status: "Normal",
        },
        rightEye: {
          result: {
            202.6: 0,
            173.3: 0,
            144: 0,
            116: 0,
            86.6: 0,
            57.3: 0,
            44: 0,
            28: 0,
            20: 0,
            12: 0,
          },
          status: "Normal",
        },
      },
    }
  );
  const [selectedFlow, setSelectedFlow] =
    React.useState<VisionTestFlowsActions>(VisionTestFlowsActions.NONE);
  const [guidenceStep, setGuidenceStep] = useState<number>(0);
  const [steps, setSteps] = useState<VisionTestFlows>(
    VisionTestFlows.TEST_FLOW_SELECTOR
  );
  const [testType, setTestType] = useState<TestTypes>(TestTypes.LETTERS);

  const getTopAppBarTitle = () => {
    const guidenceStepText =
      guidenceStep + 1 + " Out of " + LongDistanceTestGuidenceSteps.length;
    switch (steps) {
      case VisionTestFlows.TEST_INSTRUCTIONS:
        return guidenceStepText;
      case VisionTestFlows.TEST_FLOW_SELECTOR:
        return "Long Distance Test";
      case VisionTestFlows.TEST_SCREEN:
        return "Long Distance Test";
      case VisionTestFlows.TEST_RESULT:
        return "Test Results";
      case VisionTestFlows.TEST_TYPE_SELECTOR:
        return "Vision Test Element";
      default:
        return "Long Distance Test";
    }
  };
  return (
    <View>
      <VisionHomeScreenTopAppBar header={getTopAppBarTitle()} />

      {steps === VisionTestFlows.TEST_INSTRUCTIONS ? (
        <LongDistanceTestGuidence
          steps={guidenceStep}
          setGuidenceSteps={setGuidenceStep}
          setSelectedFlow={setSteps}
        />
      ) : steps === VisionTestFlows.TEST_FLOW_SELECTOR ? (
        <LongDistanceFlowSelector
          setSelectedFlow={setSelectedFlow}
          setSteps={setSteps}
        />
      ) : steps === VisionTestFlows.TEST_SCREEN ? (
        <LongDinstanceVisionTest
          selectedFlow={selectedFlow}
          setSteps={setSteps}
          setResults={setVisionTestStates}
          testType={testType}
        />
      ) : steps === VisionTestFlows.TEST_RESULT ? (
        <TestResults visionTestResults={visionTestStates} setSteps={setSteps} />
      ) : (
        <VisionTestTestTypeSelector
          setSelectedFlow={setSelectedFlow}
          setSteps={setSteps}
          setTestType={setTestType}
        />
      )}
    </View>
  );
};

export default LongDistanceVisionTestContainer;

const styles = StyleSheet.create({});
