import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import {
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";

const LongDistanceFlowSelector = ({
  setSelectedFlow,
  setSteps,
}: {
  setSelectedFlow: React.Dispatch<React.SetStateAction<VisionTestFlowsActions>>;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const [selected, setSelected] = React.useState<number>(-1);
  const onPress = (index: number) => {
    setSelected(index);
    setSelectedFlow(
      index === 0
        ? VisionTestFlowsActions.PERFORM_BY_MYSELF
        : VisionTestFlowsActions.PERFORM_WITH_HELP
    );
    if (index === 0) setSteps(VisionTestFlows.TEST_TYPE_SELECTOR);
    else setSteps(VisionTestFlows.TEST_INSTRUCTIONS);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={[
            styles.imageContainer,
            { borderColor: selected === 0 ? BASIC_COLORS.PRIMARY : "#E9F1FF" },
          ]}
          onPress={() => onPress(0)}
        >
          <Image source={require("../../../assets/Distance_Test.png")} />
        </TouchableOpacity>
        <Text
          style={[
            styles.mainLabel,
            {
              color: selected === 0 ? BASIC_COLORS.PRIMARY : "#002055",
            },
          ]}
        >
          Perform by Myself
        </Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={[
            styles.imageContainer,
            { borderColor: selected === 1 ? BASIC_COLORS.PRIMARY : "#E9F1FF" },
          ]}
          onPress={() => onPress(1)}
        >
          <Image source={require("../../../assets/Distance_Test.png")} />
        </TouchableOpacity>
        <Text
          style={[
            styles.mainLabel,
            {
              color: selected === 1 ? BASIC_COLORS.PRIMARY : "#002055",
            },
          ]}
        >
          Perform with Someonces Guidence
        </Text>
      </View>
    </View>
  );
};
///Users/fazidsamoon/Developer/Personal/Uni/RESEARCH/Retina-Mobile-App/src/assets/Distance_Test.png

export default LongDistanceFlowSelector;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 10,
  },
  card: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,

    borderRadius: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E9F1FF",
    borderWidth: 2,
  },
  mainLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#002055",
    marginTop: 20,
  },
});
