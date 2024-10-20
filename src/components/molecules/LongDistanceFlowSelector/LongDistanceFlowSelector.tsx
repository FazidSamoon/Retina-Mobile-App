import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import {
  VisionTestFlows,
  VisionTestFlowsActions,
} from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import SpeechBubble from "../../organisms/VisionHomeScreenContainer/SpeachBubble";
import * as Animatable from "react-native-animatable";
import Doctor1 from "../../../assets/doctorMain.png";
import * as Speech from "expo-speech";

const LongDistanceFlowSelector = ({
  setSelectedFlow,
  setSteps,
}: {
  setSelectedFlow: React.Dispatch<React.SetStateAction<VisionTestFlowsActions>>;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  const [selected, setSelected] = React.useState<number>(-1);
  const [modalVisible, setModalVisible] = useState(true);
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
  const narrateText = (message) => {
    Speech.speak(message, {
      voice: "en-in-x-ene-local",
      pitch: 1.0,
      rate: 1.0,
    });
  };

  useEffect(() => {
    if (modalVisible) {
      narrateText(
        "You can perform the test by your self or with someone elses help!. Please select your preferred method"
      );
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    Speech.stop();
    setModalVisible(false);
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <SpeechBubble
              message="You can perform by your self or with someone elses help!"
              position="left"
            />
            <Animatable.Image
              animation="bounceIn"
              duration={1500}
              source={Doctor1}
              style={styles.doctorImage}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    height: 600,
    borderRadius: 10,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  doctorImage: {
    width: 300,
    height: 500,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
});
