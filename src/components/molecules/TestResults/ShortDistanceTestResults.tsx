import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { ShortDistanceVisionTestStateType } from "../../organisms/ShortDistanceVisionTestContainer/ShortDistanceVisionTestTypes";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { LinearProgress } from "react-native-elements";
import CompletionLogo from "../../../assets/CompletionLogo";
import DetailedOverview from "./DetailedOverview";
import { useNavigation } from "@react-navigation/native";
import {
  calculateGainedXp,
  calculateVisualAcuityScoreUsingSLMAformulaNearVision,
} from "../../../utils/common/scoreCalculations";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosConfig";
import { API_URL } from "../../../api/config";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  UserType,
  VisionTestChallenge,
} from "../../../utils/types/commonTypes";
import Voice from "@react-native-voice/voice";
import {
  updateUserChallengesCompletion,
  updateUserLevels,
} from "../../../api/challanges";
import { showToastWithGravityAndOffset } from "../../../utils/common/commonUtil";

const ShortDistanceTestResults = ({
  visionTestResults,
  setSteps,
  user,
}: {
  visionTestResults: ShortDistanceVisionTestStateType;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  user: UserType;
}) => {
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);
  const [pendingChallenges, setPendingChallenges] = useState<
    VisionTestChallenge[]
  >([]);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const [gainedXP, setGainedXP] = useState(5);
  const [gainedPoints, setGainedPoints] = useState(0);

  useEffect(() => {
    stopSpeechToText();
  }, []);

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.error(error);
    }
  };

  const { xpGained, globalChalleges } = useSelector((state: RootState) => ({
    xpGained: state.challengesReducer.userLevels.xpGained,
    globalChalleges: state?.challengesReducer?.challenges,
  }));

  useEffect(() => {
    if (globalChalleges && globalChalleges?.length > 0) {
      setPendingChallenges(
        globalChalleges.filter((challenges) => challenges.status === "PENDING")
      );
    }
  }, [globalChalleges]);

  const onNextButtonPressed = () => {
    mutate(user?.data?.otherDetails?._id);

    const pendingLongDistanceTasksList = pendingChallenges.filter(
      (challenge) =>
        challenge.identification.includes("shortDistanceVisionTest") &&
        challenge.status === "PENDING"
    );

    const listOfCompletedTasks = [];
    pendingLongDistanceTasksList.forEach((element) => {
      setCompletedTaskIds((prev) => [...prev, element._id]);
      listOfCompletedTasks.push(element._id);
      setGainedPoints(gainedPoints + element.scorePoints);
      setGainedXP(calculateGainedXp(gainedXP, element.dificulty));
    });

    if (listOfCompletedTasks.length > 0)
      handleUploadCompletion(listOfCompletedTasks);
  };

  const handleUploadCompletion = async (taskIds: string[]) => {
    const { apiError, apiSuccess } = await updateUserChallengesCompletion(
      user?.data?.otherDetails?._id,
      taskIds
    );

    if (apiSuccess) {
      console.log(apiSuccess);
    } else if (apiError) {
      console.log(apiError);
    }
  };

  const calculateLeftEyeLogmarScore = (): string => {
    const sortedResultsLeftEye: [string, number][] = Object.entries(
      visionTestResults.testResults.leftEye.result
    ).sort((a, b) => {
      return parseFloat(b[0]) - parseFloat(a[0]);
    });
    const leftEye = sortedResultsLeftEye.filter((item) => item[1] > 0);
    if (leftEye.length === 0) {
      const rightEyeLogmarScore =
        calculateVisualAcuityScoreUsingSLMAformulaNearVision("137", 5);

      return rightEyeLogmarScore.toFixed(2);
    } else {
      const leftEyeLogmarScore =
        calculateVisualAcuityScoreUsingSLMAformulaNearVision(
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
      const rightEyeLogmarScore =
        calculateVisualAcuityScoreUsingSLMAformulaNearVision("137", 5);

      return rightEyeLogmarScore.toFixed(2);
    } else {
      const rightEyeLogmarScore =
        calculateVisualAcuityScoreUsingSLMAformulaNearVision(
          rightEye[rightEye.length - 1][0],
          5 - rightEye[rightEye.length - 1][1]
        );

      return rightEyeLogmarScore.toFixed(2);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (userId: string) => {
      const payload = {
        ...visionTestResults,
        user: userId,
        overrollTestScore: {
          leftEye: Number(calculateLeftEyeLogmarScore()),
          rightEye: Number(calculateRightEyeLogmarScore()),
        },
        distance: 0.3,
        testType: "NEAR_VISION",
      };
      const response = await axiosInstance.post(
        `${API_URL}/test-results`,
        payload
      );
      console.log("ssss ", response);
      return response;
    },
    onSuccess: () => {
      setShowModal(true);
    },
    onError: () => {},
  });

  const handleUploadExperience = async () => {
    const { apiError, apiSuccess } = await updateUserLevels(
      user?.data?.otherDetails?._id,
      gainedXP
    );

    if (apiSuccess) {
      showToastWithGravityAndOffset("Successfully updated the level");
    } else if (apiError) {
      showToastWithGravityAndOffset("Something went wrong with updating level");
    }
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        position: "relative",
        height: Dimensions.get("window").height * 0.75,
      }}
    >
      <DetailedOverview
        visionTestResults={visionTestResults}
        leftEyeScore={calculateLeftEyeLogmarScore()}
        rightEyeScore={calculateRightEyeLogmarScore()}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <RPPrimaryButton buttonTitle={"Next"} onPress={onNextButtonPressed} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              paddingVertical: 30,
              borderRadius: 30,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <CompletionLogo />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Congratulations!
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              You have Successfully Performed the Near Distance Test
            </Text>

            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-end",
                }}
              >
                <Text>+{gainedXP}</Text>
              </View>
              <LinearProgress
                value={gainedXP / 100}
                trackColor="#F4F6F9"
                color={BASIC_COLORS.PRIMARY}
                style={{
                  height: 10,
                  borderRadius: 5,

                  marginBottom: 5,
                }}
              />

              <Text style={{ color: BASIC_COLORS.PRIMARY }}>
                {gainedXP}/100
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
                width: "80%",
              }}
            >
              <RPPrimaryButton
                onPress={() => {
                  setSteps(VisionTestFlows.TEST_FLOW_SELECTOR);
                  setShowModal(false);
                  handleUploadExperience();
                }}
                buttonTitle={"Go to home"}
                buttonStyle={{ borderRadius: 30 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShortDistanceTestResults;

const styles = StyleSheet.create({});
