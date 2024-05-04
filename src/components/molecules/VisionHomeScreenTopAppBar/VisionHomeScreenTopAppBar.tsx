import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BackArrowHead from "../../../assets/BackArrowHead";
import Voice from "@react-native-voice/voice";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";

const VisionHomeScreenTopAppBar = ({
  header = "Check Vision Task",
  navigateTo,
  setSteps,
}: {
  header: string;
  navigateTo?: () => void;
  setSteps?: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    if (navigateTo) {
      navigateTo();
    } else {
      navigation.goBack();
    }

    stopSpeechToText();

    setSteps && setSteps(VisionTestFlows.TEST_FLOW_SELECTOR);
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <TouchableOpacity style={styles.menuContainer} onPress={handleNavigation}>
        <BackArrowHead />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#002055",
        }}
      >
        {header}
      </Text>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
        }}
      ></TouchableOpacity>
    </View>
  );
};

export default VisionHomeScreenTopAppBar;

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 25,
    borderColor: "#E9F1FF",
    borderWidth: 1,
  },
});
