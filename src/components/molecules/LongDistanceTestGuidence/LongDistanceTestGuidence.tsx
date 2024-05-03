import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ForwardArrowHead from "../../../assets/ForwardArrowHead";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { LongDistanceTestGuidenceSteps } from "../../../utils/types/data";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";

const LongDistanceTestGuidence = ({
  steps,
  setGuidenceSteps,
  setSelectedFlow,
}: {
  steps: number;
  setGuidenceSteps: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFlow: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const handleNextStep = () => {
    if (steps < LongDistanceTestGuidenceSteps.length - 1) {
      setGuidenceSteps(steps + 1);
    }

    if (steps === LongDistanceTestGuidenceSteps.length - 1) {
      setSelectedFlow(VisionTestFlows.TEST_SCREEN);
    }
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
    height: Dimensions.get("window").height - 100,
    width: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
