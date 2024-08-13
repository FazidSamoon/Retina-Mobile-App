import { Dimensions, StyleSheet, Text, View, Image, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import {
  ResultStatus,
  VisionTestStateType,
} from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import { ShortDistanceVisionTestStateType } from "../../organisms/ShortDistanceVisionTestContainer/ShortDistanceVisionTestTypes";
import { getCurrentWeek } from "../../../utils/common/commonUtil";
import { ShortDistanceVisionTestSteps } from "../NearVisionTest/NearVisionTestTypes";
import {
  VisionTestLetters,
  VisionTestNumbers,
} from "../../../utils/types/data";
import Voice from "@react-native-voice/voice";
import {
  getNextNearTextSize,
  identifiyLetters,
  identifyNumbers,
} from "../../../utils/common/speechIdentification";
import ForwardArrowHead from "../../../assets/ForwardArrowHead";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const ShortDistanceVisionTest = ({
  setSteps,
  setResults,
  testType,
}: {
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  setResults: React.Dispatch<
    React.SetStateAction<ShortDistanceVisionTestStateType>
  >;
  testType: TestTypes;
}) => {
  const [startedListning, setStartedListning] = useState<boolean>(false);
  const [letterRecognitionResult, setLetterRecognitionResult] = useState([]);
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

  const [currentStep, setCurrentStep] = useState<ShortDistanceVisionTestSteps>(
    ShortDistanceVisionTestSteps.SIZE_J7
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);

  const [showStepChangeModal, setShowStepChangeModal] =
    useState<boolean>(false);
  const [showEyeChangeModal, setShowEyeChangeModal] = useState<boolean>(false);
  const [showStepChangeModalSize, setShowStepChangeModalSize] =
    useState<number>(0);
  const [status, setStatus] = useState<ResultStatus>(ResultStatus.NULL);
  const [currentTextSize, setCurrentTextSize] = useState<number>(137);
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

  const setShortDistanceVisionTestStep = (
    step: ShortDistanceVisionTestSteps
  ) => {
    switch (step) {
      case ShortDistanceVisionTestSteps.SIZE_J10:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J7);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J7:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J6);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J6:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J5);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J5:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J4);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J4:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J3);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J3:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J2);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J2:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J1PLUS);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J1PLUS:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J1);
        break;
      case ShortDistanceVisionTestSteps.SIZE_J1:
        setCurrentStep(ShortDistanceVisionTestSteps.PASSED);
        break;
      default:
        setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J10);
        break;
    }
  };

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * VisionTestLetters.length);
    letterInView.current = VisionTestLetters[randomIndex];
    return VisionTestLetters[randomIndex];
  };

  const getRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * 10);
    letterInView.current = VisionTestNumbers[randomIndex];
    return VisionTestNumbers[randomIndex];
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
      letterInView.current = null;
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        setCurrentStepIndex((prev) => prev + 1);
      setLetterRecognitionResult([]);
      setIdentified(false);
      setListning(false);
    }
    if (timer === 15) {
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        letterInView.current =
          testType === TestTypes.LETTERS
            ? getRandomLetter()
            : getRandomNumber();
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
      stopSpeechToText();
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
      setShortDistanceVisionTestStep(currentStep);
      if (currentStepIndex < 51)
        setCurrentTextSize(getNextNearTextSize(currentTextSize));
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

  const onSpeechResults = (event) => {
    setLetterRecognitionResult(event.value);
    console.log("onSpeechResults", event.value);
    const recognitionState: boolean =
      testType === TestTypes.LETTERS
        ? identifiyLetters(event.value, letterInView.current)
        : identifyNumbers(event.value, parseInt(letterInView.current));

    if (recognitionState) {
      letterInView.current = null;
      stopSpeechToText();
      if (currentStepIndex < 51 && status === ResultStatus.NULL)
        setCurrentStepIndex((prev) => prev + 1);
      setListning(false);
      setIdentified(true);
      setSuccessfullyIdentified((prev) => prev + 1);
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
      console.log("End Test Left Eye ", visionTestStates);
      setCurrentEye("rightEye");
      setStatus(ResultStatus.NULL);
      setShowEyeChangeModal(true);
      setCurrentStepIndex(1);
      setCurrentTextSize(202.6);
    }

    if (
      (currentEye === "rightEye" && status === ResultStatus.FAILED) ||
      (currentEye === "rightEye" && ResultStatus.PASSED) ||
      (currentEye === "rightEye" && currentStepIndex === 51)
    ) {
      console.log("End Test Right Eye ", visionTestStates);
      stopSpeechToText();
      setVisionTestStates({
        ...visionTestStates,
        testCompleted: true,
      });

      setTimer(0);
      setCurrentStepIndex(1);
      setStatus(ResultStatus.PASSED);
      setResults(visionTestStates);
      setSteps(VisionTestFlows.TEST_RESULT);
    }
  };

  const handleTextSizeStepChange = () => {
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
      setShortDistanceVisionTestStep(currentStep);
      if (currentStepIndex < 51)
        setCurrentTextSize(getNextNearTextSize(currentTextSize));

      if (successfullyIdentified < 3) {
        stopSpeechToText();
        setStatus(ResultStatus.FAILED);
        setListning(false);
      }
      setSuccessfullyIdentified(0);
    }
  };
  console.log(currentTextSize, letterInView.current)
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
      </View>

      <View style={styles.textContainerView}>
        {letterInView.current === null ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: "white",
                borderColor: "#E9F1FF",
                borderWidth: 5,
              }}
            >
              <ForwardArrowHead height={60} width={60} />
            </View>
          </>
        ) : (
          <Text
            style={{
              fontSize: currentTextSize,
              fontWeight: "bold",
            }}
          >
            {letterInView.current}
          </Text>
        )}
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        {status === ResultStatus.NULL ? (
          <AnimatedCircularProgress
            size={100}
            width={7}
            fill={(timer * 100) / 15}
            tintColor={
              timer > 10 ? BASIC_COLORS.PRIMARY : timer > 5 ? "orange" : "red"
            }
            backgroundColor="#3d5875"
          >
            {(fill) => (
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                }}
              >
                {timer}
              </Text>
            )}
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

      <View
        style={{
          marginTop: 10,
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
          {listning && !identified && !showEyeChangeModal && (
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
              height: Dimensions.get("window").height * 0.7,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Please close your LEFT eye
            </Text>
            <Image
              source={require("../../../assets/CloseLeftEye.png")}
              style={{
                width: Dimensions.get("window").width * 0.6,
                height: Dimensions.get("window").height * 0.4,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShortDistanceVisionTest;

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
