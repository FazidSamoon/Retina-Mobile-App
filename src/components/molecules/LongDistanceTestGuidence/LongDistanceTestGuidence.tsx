import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import ForwardArrowHead from "../../../assets/ForwardArrowHead";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { LongDistanceTestGuidenceStepsType } from "./LongDistanceStepTypes";
import * as Speech from "expo-speech";

const LongDistanceTestGuidence = ({
  steps,
  setGuidenceSteps,
  setSelectedFlow,
  flow,
  testType,
}: {
  steps: number;
  setGuidenceSteps: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFlow: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  flow: VisionTestFlowsActions;
  testType: TestTypes;
}) => {
  const handleNextStep = () => {
    if (steps < LongDistanceTestGuidenceSteps.length - 1) {
      setGuidenceSteps(steps + 1);
    }

    if (steps === LongDistanceTestGuidenceSteps.length - 1) {
      if (flow === VisionTestFlowsActions.PERFORM_BY_MYSELF) {
        setSelectedFlow(VisionTestFlows.TEST_DISTANCE_MEASURER);
      } else {
        setSelectedFlow(VisionTestFlows.TEST_DISTANCE_MEASURER);
      }
    }
    Speech.stop();
  };

  const LongDistanceTestGuidenceSteps: LongDistanceTestGuidenceStepsType[] = [
    {
      step: 1,
      title: "Step 1",
      description:
        "If you are wearing glasses wear them before performing the test",
      image: require("../../../assets/step1.png"),
    },
    {
      step: 2,
      title: "Step 2",
      description: "Stand at least 2m away from the screen",
      image: require("../../../assets/step2.png"),
    },
    {
      step: 3,
      title: "Step 3",
      description:
        flow === VisionTestFlowsActions.PERFORM_BY_MYSELF
          ? "Once you identified the letter pronounce the letter loud and clear before clocks ticks out"
          : "Once you identified the letter ask for helper to swipe to the direction letter is pointing",
      image:
        flow === VisionTestFlowsActions.PERFORM_BY_MYSELF
          ? require("../../../assets/voicepng.png")
          : require("../../../assets/4.png"),
    },
  ];

  const narrateText = (message: string) => {
    Speech.speak(message, {
      voice: "en-in-x-ene-local",
      pitch: 1.0,
      rate: 1.0,
    });
  };

  useEffect(() => {
    const currentStepDescription =
      LongDistanceTestGuidenceSteps[steps].description;
    narrateText(currentStepDescription);
  }, [steps]);

  const handleCloseModal = () => {
    Speech.stop();
    // Handle modal close logic
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Image source={LongDistanceTestGuidenceSteps[steps].image} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              maxWidth: 350,
              fontWeight: "600",
            }}
          >
            {LongDistanceTestGuidenceSteps[steps].title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              maxWidth: 350,
              fontWeight: "400",
            }}
          >
            {LongDistanceTestGuidenceSteps[steps].description}
          </Text>
          {steps === 2 && flow === VisionTestFlowsActions.PERFORM_BY_MYSELF ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                maxWidth: 350,
                fontWeight: "400",
                color: "red",
              }}
            >
              Note: Prononce the letter followed by word{" "}
              <Text
                style={{
                  fontWeight: "900",
                  fontSize: 25,
                }}
              >
                {testType === TestTypes.LETTERS ? "Letter" : "Number"}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>

      <Pressable
        onPress={handleNextStep}
        style={{
          backgroundColor: "#F0F8FF",
          height: 101,
          width: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          borderColor: BASIC_COLORS.PRIMARY,
          borderBottomColor: "red",
          borderTopColor: "blue",
          borderWidth: 2,
        }}
      >
        <ForwardArrowHead fill={BASIC_COLORS.PRIMARY} />
      </Pressable>
    </View>
  );
};

export default LongDistanceTestGuidence;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - 200,
    width: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
