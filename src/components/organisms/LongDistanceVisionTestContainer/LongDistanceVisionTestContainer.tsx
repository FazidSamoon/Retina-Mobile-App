import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  getCurrentWeek,
  getDataFromAsyncStorage,
} from "../../../utils/common/commonUtil";
import {
  LongDIstanceVisionTestSteps,
  PersonalizedDistance,
  UserLevelResponseType,
  VisionTestStateType,
} from "../../molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestTestTypeSelector from "../../molecules/VisionTestTestTypeSelector/VisionTestTestTypeSelector";
import LongDistanceVisionSwipableTest from "../../molecules/LongDistanceVisionSwipableTest/LongDistanceVisionSwipableTest";
import LongDistanceVIsionTestDistanceConfirermer from "../../molecules/LongDIstanceVisionTestDistanceConfirmer/LongDistanceVIsionTestDistanceConfirermer";
import { UserType } from "../../../utils/types/commonTypes";
import { getAverageTestScore } from "../../../api/tests";
import { getTestParameters } from "../../../utils/common/scoreCalculations";
import { useDispatch } from "react-redux";
import {
  setPersonalizedDistanceGlobal,
  setPersonalizedStartLineGLobal,
  setUserLevel,
} from "../../../store/slices/visionTestChallengesSlice";
import { getUserLevels } from "../../../api/challanges";

const LongDistanceVisionTestContainer = () => {
  const dispatch = useDispatch();
  const [personalizedDistance, setPersonalizedDistance] =
    useState<PersonalizedDistance>(PersonalizedDistance.FOURMETER);
  const [personalizedTestSize, setPersonalizedTestSize] =
    useState<LongDIstanceVisionTestSteps>(
      LongDIstanceVisionTestSteps.SIZE_202_6
    );
  const [user, setUser] = useState<UserType>();
  const [visionTestStates, setVisionTestStates] = useState<VisionTestStateType>(
    {
      date: new Date(),
      week: getCurrentWeek(),
      year: new Date().getFullYear(),
      testCompleted: false,
      testType: "LONG_DISTANCE",
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
  const [levelStatus, setLevelStatus] = useState<UserLevelResponseType>();

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
      case VisionTestFlows.TEST_DISTANCE_MEASURER:
        return "Keep your distance";
      default:
        return "Long Distance Test";
    }
  };

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError, apiSuccess } = await getAverageTestScore(
      userObj.data?.otherDetails?._id
    );
    if (apiSuccess) {
      const { distance, startLine } = getTestParameters(
        apiSuccess.data.rightEye
      );

      setPersonalizedDistance(distance);
      setPersonalizedTestSize(startLine);
      dispatch(setPersonalizedDistanceGlobal(distance));
      dispatch(setPersonalizedStartLineGLobal(startLine));
    } else if (apiError) {
      console.log(apiError);
    }

    const { apiError: userLevelError, apiSuccess: userLevelSuccess } =
      await getUserLevels(userObj.data?.otherDetails?._id);

    if (userLevelSuccess) {
      dispatch(setUserLevel(userLevelSuccess));
      setLevelStatus(userLevelSuccess);
    } else if (userLevelError) {
      console.log(userLevelError);
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

  return (
    <View>
      <VisionHomeScreenTopAppBar
        header={getTopAppBarTitle()}
        setSteps={setSteps}
      />

      {steps === VisionTestFlows.TEST_INSTRUCTIONS ? (
        <LongDistanceTestGuidence
          steps={guidenceStep}
          setGuidenceSteps={setGuidenceStep}
          setSelectedFlow={setSteps}
          flow={selectedFlow}
          testType={testType}
        />
      ) : steps === VisionTestFlows.TEST_FLOW_SELECTOR ? (
        <LongDistanceFlowSelector
          setSelectedFlow={setSelectedFlow}
          setSteps={setSteps}
        />
      ) : steps === VisionTestFlows.TEST_SCREEN &&
        selectedFlow === VisionTestFlowsActions.PERFORM_BY_MYSELF ? (
        <LongDinstanceVisionTest
          selectedFlow={selectedFlow}
          setSteps={setSteps}
          setResults={setVisionTestStates}
          testType={testType}
          personalizedTestSize={personalizedTestSize}
          personalizedDistance={personalizedDistance}
        />
      ) : steps === VisionTestFlows.TEST_RESULT ? (
        <TestResults
          visionTestResults={visionTestStates}
          setSteps={setSteps}
          personalizedDistance={personalizedDistance}
          user={user}
        />
      ) : steps === VisionTestFlows.TEST_SCREEN &&
        selectedFlow === VisionTestFlowsActions.PERFORM_WITH_HELP ? (
        <LongDistanceVisionSwipableTest
          selectedFlow={selectedFlow}
          setSteps={setSteps}
          setResults={setVisionTestStates}
          testType={testType}
          personalizedDistance={personalizedDistance}
          personalizedTestSize={personalizedTestSize}
        />
      ) : steps === VisionTestFlows.TEST_DISTANCE_MEASURER ? (
        <LongDistanceVIsionTestDistanceConfirermer
          personalizedDistance={personalizedDistance}
          setSteps={setSteps}
        />
      ) : (
        <VisionTestTestTypeSelector
          setSteps={setSteps}
          setTestType={setTestType}
        />
      )}
    </View>
  );
};

export default LongDistanceVisionTestContainer;

const styles = StyleSheet.create({});
