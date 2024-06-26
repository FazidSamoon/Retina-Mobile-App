import { Dimensions, StyleSheet, Text, View, Image, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Brightness from "expo-brightness";
import { getCurrentWeek } from "../../../utils/common/commonUtil";
import {
  LongDIstanceVisionTestSteps,
  ResultStatus,
  VisionTestStateType,
} from "./LongDistanceVIsionTestTypes";
import { VisionTestLetters } from "../../../utils/types/data";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import Voice from "@react-native-voice/voice";
import SoundWave from "../../atoms/SoundWave/SoundWave";
import { identifiyLetters } from "../../../utils/common/speechIdentification";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import {
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";

const LongDinstanceVisionTest = ({
  selectedFlow,
  setSteps,
}: {
  selectedFlow: VisionTestFlowsActions;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const [startedListning, setStartedListning] = useState<boolean>(false);
  const [letterRecognitionResult, setLetterRecognitionResult] = useState([]);
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

  const [currentStep, setCurrentStep] = useState<LongDIstanceVisionTestSteps>(
    LongDIstanceVisionTestSteps.SIZE_202_6
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);

  const [showStepChangeModal, setShowStepChangeModal] =
    useState<boolean>(false);
  const [showEyeChangeModal, setShowEyeChangeModal] = useState<boolean>(false);
  const [showStepChangeModalSize, setShowStepChangeModalSize] =
    useState<number>(0);
  const [status, setStatus] = useState<ResultStatus>(ResultStatus.NULL);
  const [currentTextSize, setCurrentTextSize] = useState<number>(202.6);
  const [currentEye, setCurrentEye] = useState<"leftEye" | "rightEye">(
    "leftEye"
  );
  const [timer, setTimer] = useState<number>(15);
  const [listning, setListning] = useState<boolean>(false);
  const [identified, setIdentified] = useState<boolean>(false);
  const [successfullyIdentified, setSuccessfullyIdentified] =
    useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const letterInView = useRef<string>("E");

  const getNextTextSize = (curr: number) => {
    switch (curr) {
      case 202.6:
        return 173.3;
      case 173.3:
        return 144;
      case 144:
        return 116;
      case 116:
        return 86.6;
      case 86.6:
        return 57.3;
      case 57.3:
        return 44;
      case 44:
        return 28;
      case 28:
        return 20;
      case 20:
        return 12;
      case 12:
        return 0;
      default:
        return 0;
    }
  };

  const setLongDistanceVisionTestStep = (step: LongDIstanceVisionTestSteps) => {
    switch (step) {
      case LongDIstanceVisionTestSteps.SIZE_202_6:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_173_3);
        break;
      case LongDIstanceVisionTestSteps.SIZE_173_3:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_144);
        break;
      case LongDIstanceVisionTestSteps.SIZE_144:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_116);
        break;
      case LongDIstanceVisionTestSteps.SIZE_116:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_86_6);
        break;
      case LongDIstanceVisionTestSteps.SIZE_86_6:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_57_3);
        break;
      case LongDIstanceVisionTestSteps.SIZE_57_3:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_44);
        break;
      case LongDIstanceVisionTestSteps.SIZE_44:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_28);
        break;
      case LongDIstanceVisionTestSteps.SIZE_28:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_20);
        break;
      case LongDIstanceVisionTestSteps.SIZE_20:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_12);
        break;
      case LongDIstanceVisionTestSteps.SIZE_12:
        setCurrentStep(LongDIstanceVisionTestSteps.PASSED);
        break;
      default:
        setCurrentStep(LongDIstanceVisionTestSteps.SIZE_202_6);
        break;
    }
  };

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * VisionTestLetters.length);
    letterInView.current = VisionTestLetters[randomIndex];
    return VisionTestLetters[randomIndex];
  };

  useEffect(() => {
    let interval;

    const startTimer = () => {
      clearInterval(interval);
      setTimeout(() => {
        setTimer(15);
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 0) {
              clearInterval(interval);
              startTimer();
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      }, 3000);
    };

    interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          if (status === ResultStatus.NULL) {
            startTimer();
          }

          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      stopSpeechToText();
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        setCurrentStepIndex((prev) => prev + 1);
      setLetterRecognitionResult([]);
      setIdentified(false);
      setListning(false);
    }
    if (timer === 15) {
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        letterInView.current = getRandomLetter();
      setIdentified(false);
      startSpeechToText();
      setListning(true);
    }
  }, [timer]);

  useEffect(() => {
    handleTextSizeStepChange();
  }, [currentStepIndex]);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    Voice.onSpeechStart = (e) => {
      if (!listning) setListning(true);
    };

    Voice.onSpeechRecognized = (e) => {
      console.log("onSpeechRecognized", e);
    };

    Voice.onSpeechError = (e) => {
      console.log("onSpeechErrorsssssss", e);
      setTimeout(startSpeechToText, 1000);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (status !== ResultStatus.NULL || currentStepIndex === 51) {
      setListning(false);
      setStartedListning(false);
      stopSpeechToText();
    }
  }, [status, currentStepIndex]);

  useEffect(() => {
    if (status === ResultStatus.FAILED || currentStepIndex === 51) {
      stopSpeechToText();
      endTest();
    } else if (status === ResultStatus.PASSED) {
      setVisionTestStates({
        ...visionTestStates,
        testResults: {
          ...visionTestStates.testResults,
          [currentEye]: {
            result: {
              ...visionTestStates.testResults[currentEye].result,
              [currentTextSize]: successfullyIdentified,
            },
            status: "Normal",
          },
        },
      });
      setLongDistanceVisionTestStep(currentStep);
      if (currentStepIndex < 51)
        setCurrentTextSize(getNextTextSize(currentTextSize));
      setSuccessfullyIdentified(0);
    }
  }, [status, currentStepIndex]);

  useEffect(() => {
    let timeout;
    if (showEyeChangeModal) {
      timeout = setTimeout(() => {
        setShowEyeChangeModal(false);
        setSuccessfullyIdentified(0);
        setTimer(15);
        setListning(true);
        startSpeechToText();
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [showEyeChangeModal]);

  const handleTextSizeStepChange = () => {
    console.log("currentStepIndex", currentStepIndex);
    if (
      currentStepIndex === 6 ||
      currentStepIndex === 11 ||
      currentStepIndex === 16 ||
      currentStepIndex === 21 ||
      currentStepIndex === 26 ||
      currentStepIndex === 31 ||
      currentStepIndex === 36 ||
      currentStepIndex === 41 ||
      currentStepIndex === 46 ||
      currentStepIndex === 51
    ) {
      console.log("currentStepIndex hello world");
      setVisionTestStates({
        ...visionTestStates,
        testResults: {
          ...visionTestStates.testResults,
          [currentEye]: {
            result: {
              ...visionTestStates.testResults[currentEye].result,
              [currentTextSize]: successfullyIdentified,
            },
            status: "Normal",
          },
        },
      });
      setLongDistanceVisionTestStep(currentStep);
      if (currentStepIndex < 51)
        setCurrentTextSize(getNextTextSize(currentTextSize));

      if (successfullyIdentified < 4) {
        stopSpeechToText();
        setStatus(ResultStatus.FAILED);
        alert("You have failed the test at level ");
        setListning(false);
      }
      setSuccessfullyIdentified(0);
    }
  };

  const onSpeechResults = (event) => {
    setLetterRecognitionResult(event.value);
    console.log("onSpeechResults", event.value);
    const recognitionState: boolean = identifiyLetters(
      event.value,
      letterInView.current
    );

    if (recognitionState) {
      stopSpeechToText();
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        setCurrentStepIndex((prev) => prev + 1);
      setListning(false);
      setIdentified(true);
      setSuccessfullyIdentified(successfullyIdentified + 1);
      setLetterRecognitionResult([]);

      if (timer > 5) {
        setTimeout(() => {
          setIdentified(false);
          setTimer(15);
          startSpeechToText();
        }, 3000);
      }
    } else {
      startSpeechToText();
    }
  };

  const startSpeechToText = async () => {
    try {
      if (status === ResultStatus.NULL) {
        await Voice.start("en-US");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.error(error);
    }
  };

  const endTest = () => {
    if (
      (currentEye === "leftEye" && status === ResultStatus.FAILED) ||
      (currentEye === "leftEye" && status === ResultStatus.PASSED) ||
      (currentEye === "rightEye" && currentStepIndex === 51)
    ) {
      setCurrentEye("rightEye");
      setStatus(ResultStatus.NULL);
      setShowEyeChangeModal(true);
      setCurrentStepIndex(1);
    }

    if (
      (currentEye === "rightEye" && status === ResultStatus.FAILED) ||
      (currentEye === "rightEye" && ResultStatus.PASSED) ||
      (currentEye === "rightEye" && currentStepIndex === 51)
    ) {
      stopSpeechToText();
      setVisionTestStates({
        ...visionTestStates,
        testCompleted: true,
      });

      setTimer(0);
      setStatus(ResultStatus.PASSED);
      setSteps(VisionTestFlows.TEST_RESULT);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {currentStepIndex} / 50
          </Text>
        </View>

        {status === ResultStatus.NULL ? (
          <AnimatedCircularProgress
            size={30}
            width={3}
            fill={(timer * 100) / 15}
            tintColor={
              timer > 10 ? BASIC_COLORS.PRIMARY : timer > 5 ? "orange" : "red"
            }
            backgroundColor="#3d5875"
          >
            {(fill) => <Text>{timer}</Text>}
          </AnimatedCircularProgress>
        ) : (
          <AnimatedCircularProgress
            size={30}
            width={3}
            fill={15 / 15}
            tintColor={
              timer > 10 ? BASIC_COLORS.PRIMARY : timer > 5 ? "orange" : "red"
            }
            backgroundColor="#3d5875"
          >
            {(fill) => <Text>15</Text>}
          </AnimatedCircularProgress>
        )}
      </View>

      <View style={styles.textContainerView}>
        <Text
          style={{
            fontSize: currentTextSize,
            fontWeight: "bold",
          }}
        >
          {letterInView.current}
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Current screening {currentStep + 1}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {identified && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Identified
            </Text>
          )}
          {listning && !identified && (
            <Image source={require("../../../assets/SoundWave.gif")} />
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEyeChangeModal}
        onRequestClose={() => {
          setShowEyeChangeModal(false);
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              height: 200,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Change Eye</Text>
            <RPPrimaryButton
              buttonTitle="Change Eye"
              onPress={() => {
                setShowEyeChangeModal(false);
                setSuccessfullyIdentified(0);
                setTimer(15);
                setListning(true);
                startSpeechToText();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LongDinstanceVisionTest;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - 100,
    width: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textContainerView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 300,
    borderColor: "#E9F1FF",
    borderWidth: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
