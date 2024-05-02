import { Dimensions, StyleSheet, Text, View } from "react-native";
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

const LongDinstanceVisionTest = () => {
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
  const [showStepChangeModalSize, setShowStepChangeModalSize] =
    useState<number>(0);
  const [status, setStatus] = useState<ResultStatus>(ResultStatus.NULL);
  const [currentTextSize, setCurrentTextSize] = useState<number>(202.6);
  const [currentEye, setCurrentEye] = useState<"leftEye" | "rightEye">(
    "leftEye"
  );
  const [successfullyIdentified, setSuccessfullyIdentified] =
    useState<number>(0);
  // const [letterInView, setLetterInView] = useState<string>("E");
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

  // useEffect(() => {
  //   if (currentStepIndex / 6 === 0 && showStepChangeModal) {
  //     setTimeout(() => {
  //       setCurrentTextSize(getNextTextSize(currentTextSize));
  //       setLongDistanceVisionTestStep(currentStep);
  //       setShowStepChangeModal(false);
  //     }, 3000);
  //   }
  // }, [showStepChangeModal]);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Brightness.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const currentBrightness = Brightness.getBrightnessAsync().then(
  //         (res) => {
  //           // console.log("current brightness", res);
  //         }
  //       );
  //       // console.log("current brightness", currentBrightness);
  //       Brightness.setSystemBrightnessAsync(1);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (
  //     currentStepIndex === 6 ||
  //     currentStepIndex === 11 ||
  //     currentStepIndex === 16 ||
  //     currentStepIndex === 21 ||
  //     currentStepIndex === 26 ||
  //     currentStepIndex === 31 ||
  //     currentStepIndex === 36 ||
  //     currentStepIndex === 41 ||
  //     currentStepIndex === 46 ||
  //     currentStepIndex === 51
  //   ) {
  //     setVisionTestStates({
  //       ...visionTestStates,
  //       testResults: {
  //         ...visionTestStates.testResults,
  //         [currentEye]: {
  //           result: {
  //             ...visionTestStates.testResults[currentEye].result,
  //             [currentTextSize]: successfullyIdentified,
  //           },
  //           status: "Normal",
  //         },
  //       },
  //     });
  //     setShowStepChangeModal(true);
  //     setShowStepChangeModalSize(currentStepIndex);
  //     setLongDistanceVisionTestStep(currentStep);
  //     if (currentStepIndex < 51)
  //       setCurrentTextSize(getNextTextSize(currentTextSize));
  //     // cleaning states
  //     setSuccessfullyIdentified(0);
  //   }
  // }, [currentStepIndex]);

  // useEffect(() => {
  //   // startSpeechToText();

  //   const onSpeechResults = (e: any) => {
  //     console.log("onSpeechResults", e);
  //     // setLetterRecognitionResult(e.value);
  //     // if (e.value === letterInView.current) {
  //     //   setSuccessfullyIdentified(successfullyIdentified + 1);
  //     // }
  //   };

  //   Voice.onSpeechResults = onSpeechResults;

  //   Voice.onSpeechStart = (e) => {
  //     console.log("onSpeechStart", e);
  //   }

  //   Voice.onSpeechRecognized = (e) => {
  //     console.log("onSpeechRecognized", e);
  //   }

  //   Voice.onSpeechEnd = (e) => {
  //     console.log("onSpeechEnd", e);
  //     destroyRecognizer();
  //     stopSpeechToText();
  //   }

  //   Voice.onSpeechVolumeChanged = (e) => {
  //     console.log("onSpeechVolumeChanged", e);
  //   }

  //   Voice.onSpeechPartialResults = (e) => {
  //     console.log("onSpeechPartialResults", e);
  //   }

  //   // Voice.onSpeechError = (e) => {
  //   //   console.log("onSpeechError", e);
  //   //   destroyRecognizer();
  //   //   stopSpeechToText();
  //   // };

  //   // setTimeout(() => {
  //   //   stopSpeechToText();
  //   // }, 10000);

  //   return () => {
  //     stopSpeechToText();
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  useEffect(() => {
    stopSpeechToText();
  }, []);
  // useEffect(() => {
  //   startSpeechToText();

  // }, [letterInView.current, currentStepIndex]);

  // useEffect(() => {
  //   startSpeechToText();
  // }, [letterInView.current, currentStepIndex]);

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * VisionTestLetters.length);
    letterInView.current = VisionTestLetters[randomIndex];
    return VisionTestLetters[randomIndex];
  };

  // const startSpeechToText = async () => {
  //   await Voice.stop();
  //   await Voice.cancel();
  //   await Voice.destroy();
  //   await Voice.start("en-NZ", {
  //     showPartial: true,

  //   });

  //   console.log("Voice", Voice);
  //   Voice.isAvailable().then((isAvailable) => {
  //     console.log("isAvailable", isAvailable);
  //   });

  //   Voice.isRecognizing().then((isRecognizing) => {
  //     console.log("isRecognizing", isRecognizing);
  //   });

  //    Voice.onSpeechRecognized = (e) => {
  //     console.log("onSpeechRecognized", e);
  //   }

  //   Voice.onSpeechResults = (e) => {
  //     console.log("onSpeechResults", e);
  //   };

  //   Voice.onSpeechError = (e) => {
  //     console.log("onSpeechErrorsssssss", e);
  //   };
  //   setStartedListning(true);
  // };

  // const stopSpeechToText = async () => {
  //   await Voice.stop();
  //   await Voice.destroy();
  //   Voice.removeAllListeners();
  //   setStartedListning(false);
  // };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    Voice.onSpeechStart = (e) => {
      console.log("onSpeechStart", e);
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

  const onSpeechResults = (event) => {
    console.log("onSpeechResults", event);
    setLetterRecognitionResult(event.value);
    if (event.value === letterInView.current) {
      setSuccessfullyIdentified(successfullyIdentified + 1);
    }
  };

  const startSpeechToText = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.error(error);
      // Retry recognition after a delay if the service is busy
      setTimeout(startSpeechToText, 1000);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };
  console.log("letterInView", letterInView.current);
  console.log("letterRecognitionResult", letterRecognitionResult);
  return (
    <View style={styles.container}>
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
        <RPPrimaryButton
          buttonTitle={"Next"}
          onPress={() => {
            startSpeechToText();
            // setCurrentStepIndex(currentStepIndex + 1);
          }}
          buttonStyle={{ borderRadius: 30 }}
        />
        <RPPrimaryButton
          buttonTitle={"cancel"}
          onPress={async () => {
            await stopSpeechToText();
            // setCurrentStepIndex(currentStepIndex + 1);
          }}
          buttonStyle={{ borderRadius: 30 }}
        />
      </View>
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
