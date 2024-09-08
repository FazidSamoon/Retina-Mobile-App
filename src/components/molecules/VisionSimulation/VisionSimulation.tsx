import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useMemo } from "react";
import { BlurView } from "@react-native-community/blur";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const VisionSimulation = ({ logmarValue = 0.18 }: { logmarValue: number }) => {
  const calculateDynamicBlurAmount = (logmarValue, maxBlurRadius = 20) => {
    return maxBlurRadius * Math.pow(logmarValue, 2);
  };

  const getBlurAmountForLogmar = (logmarValue) => {
    if (logmarValue >= -0.1 && logmarValue <= 0.3) return 0;
    if (logmarValue > 0.3 && logmarValue <= 0.6) return 3;
    if (logmarValue > 0.6 && logmarValue <= 1.1) return 8;
    if (logmarValue > 1.1 && logmarValue <= 1.4) return 13;
    if (logmarValue > 1.4 && logmarValue <= 2.0) return 18;
    if (logmarValue > 2.0) return 23;
    return 0;
  };
  const blurAmount = useMemo(
    () => getBlurAmountForLogmar(logmarValue),
    [logmarValue]
  );

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <ImageBackground
        source={require("..//../../assets/leftView.png")}
        style={{
          width: Dimensions.get("screen").width - 60,
          height: 200,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "red",
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Normal View
        </Text>
      </ImageBackground>
      <ImageBackground
        source={require("..//../../assets/rightView.png")}
        style={{
          width: Dimensions.get("screen").width - 60,
          height: 200,
          flex: 1,
        }}
        blurRadius={blurAmount}
      >
        <Text
          style={{
            color: "red",
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Your View
        </Text>
      </ImageBackground>
    </View>
  );
};

export default VisionSimulation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
