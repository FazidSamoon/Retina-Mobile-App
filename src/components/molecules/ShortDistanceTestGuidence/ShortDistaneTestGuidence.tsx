import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { LongDistanceTestGuidenceStepsType } from "../LongDistanceTestGuidence/LongDistanceStepTypes";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import ForwardArrowHead from "../../../assets/ForwardArrowHead";

const ShortDistaneTestGuidence = ({
  steps,
  setGuidenceSteps,
  setSelectedFlow,
  flow,
  testType,
}: {
  steps: number;
  setGuidenceSteps?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFlow?: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  flow?: VisionTestFlowsActions;
  testType?: TestTypes;
}) => {
  const handleNextStep = () => {
    if (steps < ShortDistanceTestGuidenceSteps.length - 1)
      setGuidenceSteps(steps + 1);

    if (steps === ShortDistanceTestGuidenceSteps.length - 1)
      setSelectedFlow(VisionTestFlows.TEST_SCREEN);
  };

  const ShortDistanceTestGuidenceSteps: LongDistanceTestGuidenceStepsType[] = [
    {
      step: 1,
      title: "Step 1",
      description:
        "If you are wearing glasses wear then before performing the test",
      image: require("../../../assets/step1.png"),
    },
    {
      step: 2,
      title: "Step 2",
      description: "Stand at least 35-40cm away from the screen",
      image: require("../../../assets/step2.png"),
    },
    {
      step: 3,
      title: "Step 3",
      description:
        "Once you identified the letter swipe to the direction letter is pointing",
      image: require("../../../assets/4.png"),
    },
  ];
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
        <Image source={ShortDistanceTestGuidenceSteps[steps].image} />
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
            {ShortDistanceTestGuidenceSteps[steps].title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              maxWidth: 350,
              fontWeight: "400",
            }}
          >
            {ShortDistanceTestGuidenceSteps[steps].description}
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

export default ShortDistaneTestGuidence;

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
