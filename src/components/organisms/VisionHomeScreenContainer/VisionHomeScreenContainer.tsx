import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import VisionTestCard from "../../molecules/VisionTestCard/VisionTestCard";
import { VisionTestData } from "../../molecules/VisionHomeScreenTopAppBar/VisionTestTypeAndData";
import * as Animatable from "react-native-animatable";
import Doctor1 from "../../../assets/doctorMain.png";
import SpeechBubble from "./SpeachBubble";
import * as Speech from "expo-speech";
const VisionHomeScreenContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const narrateText = (message) => {
    Speech.speak(message, {
      voice: "en-in-x-ene-local",
      pitch: 0.7,
      rate: 1.0,
    });
  };

  useEffect(() => {
    if (modalVisible) {
      narrateText(
        "Hello, how are you doing today?. Let's do your daily vision test!"
      );
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    Speech.stop();
    setModalVisible(false);
  };

  useEffect(() => {
    const checkAvailableVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      console.log(voices);
    };
    checkAvailableVoices();
  }, []);

  return (
    <View>
      <VisionHomeScreenTopAppBar header={"Check Vision Task"} />
      {VisionTestData?.map((item, index) => {
        return (
          <VisionTestCard
            key={index}
            title={item.title}
            description={item.description}
            onTapLink={item.onTapLink}
            active={item.active}
          />
        );
      })}

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
              message={`Hey, how are you doing today?  Let's do your daily vision test today!`}
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

export default VisionHomeScreenContainer;

const styles = StyleSheet.create({
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
