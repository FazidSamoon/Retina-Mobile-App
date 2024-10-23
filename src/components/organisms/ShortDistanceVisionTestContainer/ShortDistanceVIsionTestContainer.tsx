import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getCurrentWeek, getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { ShortDistanceVisionTestStateType } from "./ShortDistanceVisionTestTypes";
import {
  TestTypes,
  VisionTestFlows,
} from "../LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { ShortDistanceTestGuidenceSteps } from "../../../utils/types/data";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import ShortDistaneTestGuidence from "../../molecules/ShortDistanceTestGuidence/ShortDistaneTestGuidence";
import ShortDistanceVisionTest from "../../molecules/ShortDistanceVisionTest/ShortDistanceVisionTest";
import TestResults from "../../molecules/TestResults/TestResults";
import VisionTestTestTypeSelector from "../../molecules/VisionTestTestTypeSelector/VisionTestTestTypeSelector";
import ShortDistanceTestResults from "../../molecules/TestResults/ShortDistanceTestResults";
import { UserType } from "../../../utils/types/commonTypes";
import { getUserLevels } from "../../../api/challanges";
import { useDispatch } from "react-redux";
import { setUserLevel } from "../../../store/slices/visionTestChallengesSlice";

const ShortDistanceVIsionTestContainer = () => {
  const [user, setUser] = useState<UserType>();
  const dispatch = useDispatch();
  const [visionTestStates, setVisionTestStates] =
    useState<ShortDistanceVisionTestStateType>({
      date: new Date(),
      week: getCurrentWeek(),
      year: new Date().getFullYear(),
      testCompleted: false,
      testResults: {
        leftEye: {
          result: {
            137: 0,
            69: 0,
            55: 0,
            48: 0,
            34: 0,
            28: 0,
            21: 0,
            17: 0,
            14: 0,
            11: 0,
          },
          status: "Normal",
        },
        rightEye: {
          result: {
            137: 0,
            69: 0,
            55: 0,
            48: 0,
            34: 0,
            28: 0,
            21: 0,
            17: 0,
            14: 0,
            11: 0,
          },
          status: "Normal",
        },
      },
    });
  const [guidenceStep, setGuidenceStep] = useState<number>(0);
  const [steps, setSteps] = useState<VisionTestFlows>(
    VisionTestFlows.TEST_INSTRUCTIONS
  );
  const [testType, setTestType] = useState<TestTypes>(TestTypes.LETTERS);

  const getTopAppBarTitle = () => {
    const guidenceStepText =
      guidenceStep + 1 + " Out of " + ShortDistanceTestGuidenceSteps.length;
    switch (steps) {
      case VisionTestFlows.TEST_INSTRUCTIONS:
        return guidenceStepText;
      case VisionTestFlows.TEST_FLOW_SELECTOR:
        return "Near Distance Test";
      case VisionTestFlows.TEST_SCREEN:
        return "Near Distance Test";
      case VisionTestFlows.TEST_RESULT:
        return "Test Results";
      case VisionTestFlows.TEST_TYPE_SELECTOR:
        return "Vision Test Element";
      default:
        return "Near Distance Test";
    }
  };

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError: userLevelError, apiSuccess: userLevelSuccess } =
      await getUserLevels(userObj.data?.otherDetails?._id);

    if (userLevelSuccess) {
      dispatch(setUserLevel(userLevelSuccess));
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
        step={steps}
      />
      {steps === VisionTestFlows.TEST_INSTRUCTIONS ? (
        <ShortDistaneTestGuidence
          steps={guidenceStep}
          setGuidenceSteps={setGuidenceStep}
          setSelectedFlow={setSteps}
          testType={testType}
        />
      ) : steps === VisionTestFlows.TEST_SCREEN ? (
        <ShortDistanceVisionTest
          setSteps={setSteps}
          setResults={setVisionTestStates}
          testType={testType}
        />
      ) : steps === VisionTestFlows.TEST_RESULT ? (
        <ShortDistanceTestResults  visionTestResults={visionTestStates} setSteps={setSteps} user={user} />
      ) : (
        // <VisionTestTestTypeSelector
        //   setSteps={setSteps}
        //   setTestType={setTestType}
        // />
        <></>
      )}
    </View>
  );
};

export default ShortDistanceVIsionTestContainer;

const styles = StyleSheet.create({});
