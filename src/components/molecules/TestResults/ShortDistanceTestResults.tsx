import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { ShortDistanceVisionTestStateType } from "../../organisms/ShortDistanceVisionTestContainer/ShortDistanceVisionTestTypes";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { LinearProgress } from "react-native-elements";
import CompletionLogo from "../../../assets/CompletionLogo";
import DetailedOverview from "./DetailedOverview";
import { useNavigation } from "@react-navigation/native";
import { calculateVisualAcuityScoreUsingSLMAformulaNearVision } from "../../../utils/common/scoreCalculations";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosConfig";
import { API_URL } from "../../../api/config";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ShortDistanceTestResults = ({
  visionTestResults,
  setSteps,
}: {
  visionTestResults: ShortDistanceVisionTestStateType;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);

  const { xpGained } = useSelector((state: RootState) => ({
    xpGained: state.challengesReducer.userLevels.xpGained,
  }));
  const onNextButtonPressed = () => {};

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
      return response;
    },
    onSuccess: () => {
      setShowModal(true);
    },
    onError: () => {},
  });
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
              You have Successfully Performed the Long Distance Test
            </Text>

            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LinearProgress
                value={xpGained / 100}
                trackColor="#F4F6F9"
                color={BASIC_COLORS.PRIMARY}
                style={{
                  height: 10,
                  borderRadius: 5,
                  marginTop: 20,
                  marginBottom: 5,
                }}
              />

              <Text style={{ color: BASIC_COLORS.PRIMARY }}>1/4</Text>
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
                  //   handleUploadExperience();
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
