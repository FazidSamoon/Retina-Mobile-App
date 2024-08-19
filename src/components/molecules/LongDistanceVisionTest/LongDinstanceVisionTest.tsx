import { Dimensions, StyleSheet, Text, View, Image, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Brightness from "expo-brightness";
import { getCurrentWeek } from "../../../utils/common/commonUtil";
import {
  LongDIstanceVisionTestSteps,
  ResultStatus,
  VisionTestStateType,
} from "./LongDistanceVIsionTestTypes";
import {
  VisionTestLetters,
  VisionTestNumbers,
} from "../../../utils/types/data";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import Voice from "@react-native-voice/voice";
import {
  getNextTextSize,
  identifiyLetters,
  identifyNumbers,
} from "../../../utils/common/speechIdentification";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import ForwardArrowHead from "../../../assets/ForwardArrowHead";
import FaceDetectorComponenet from "../FaceDetector/FaceDetector";

const LongDinstanceVisionTest = ({
  selectedFlow,
  setSteps,
  setResults,
  testType,
  personalizedTestSize,
}: {
  selectedFlow: VisionTestFlowsActions;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  setResults: React.Dispatch<React.SetStateAction<VisionTestStateType>>;
  personalizedTestSize: LongDIstanceVisionTestSteps;
  testType: TestTypes;
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

  const [currentStep, setCurrentStep] =
    useState<LongDIstanceVisionTestSteps>(personalizedTestSize);
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

  const [inRange, setInRange] = useState(true);
  const [showNotInRangeModal, setShowNotInRangeModal] = useState(false);

  const handleInRange = () => {
    setInRange(true);
    if (showNotInRangeModal) setShowEyeChangeModal(false);
  };
  const handleNotInRange = () => {
    setInRange(false);
    if (!showNotInRangeModal) setShowEyeChangeModal(true);
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
      setLongDistanceVisionTestStep(currentStep);
      if (currentStepIndex < 51)
        setCurrentTextSize(getNextTextSize(currentTextSize));

      if (successfullyIdentified < 3) {
        stopSpeechToText();
        setStatus(ResultStatus.FAILED);
        setListning(false);
      }
      setSuccessfullyIdentified(0);
    }
  };

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
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            height: 270,
          }}
        >
          <View
            style={{
              ...styles.camearaContainer,
              backgroundColor: inRange ? "green" : "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <FaceDetectorComponenet
              handleInRange={handleInRange}
              handleNotInRange={handleNotInRange}
              fullScreenEnabled={false}
            />
          </View>
        </View>

        <View
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
                  timer > 10
                    ? BASIC_COLORS.PRIMARY
                    : timer > 5
                    ? "orange"
                    : "red"
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
                  timer > 10
                    ? BASIC_COLORS.PRIMARY
                    : timer > 5
                    ? "orange"
                    : "red"
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
              {true && (
                <Image source={require("../../../assets/SoundWave.gif")} />
              )}
            </View>
          </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotInRangeModal}
        onRequestClose={() => {
          setShowNotInRangeModal(false);
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
              Please maintain the distance
            </Text>
            <Image
              source={require("../../../assets/doctor1.jpg")}
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
  camearaContainer: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
});
