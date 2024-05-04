import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import {
  TestTypes,
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import LetterA from "../../../assets/LetterA";
import Number1 from "../../../assets/Number1";

const VisionTestTestTypeSelector = ({
  setSelectedFlow,
  setSteps,
  setTestType,
}: {
  setSelectedFlow: React.Dispatch<React.SetStateAction<VisionTestFlowsActions>>;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  setTestType: React.Dispatch<React.SetStateAction<TestTypes>>;
}) => {
  const [selected, setSelected] = React.useState<number>(-1);
  const onPress = (index: number) => {
    setSelected(index);
    setTestType(index === 0 ? TestTypes.LETTERS : TestTypes.NUMBERS);
    setSteps(VisionTestFlows.TEST_INSTRUCTIONS);
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
          <LetterA />
        </TouchableOpacity>
        <Text
          style={[
            styles.mainLabel,
            {
              color: selected === 0 ? BASIC_COLORS.PRIMARY : "#002055",
            },
          ]}
        >
          Letters
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
          <Number1 />
        </TouchableOpacity>
        <Text
          style={[
            styles.mainLabel,
            {
              color: selected === 1 ? BASIC_COLORS.PRIMARY : "#002055",
            },
          ]}
        >
          Numbers
        </Text>
      </View>
    </View>
  );
};

export default VisionTestTestTypeSelector;

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
