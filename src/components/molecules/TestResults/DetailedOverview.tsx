import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { VisionTestStateType } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import VisionTestResultSingleCard from "../VisionTestResultSingleCard/VisionTestResultSingleCard";
import { calculateVisualAcuityScoreUsingSLMAformula } from "../../../utils/common/scoreCalculations";
import { useMutation } from "@tanstack/react-query";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import axiosInstance from "../../../api/axiosConfig";
import { API_URL } from "../../../api/config";
import SpeechBubble from "../../organisms/VisionHomeScreenContainer/SpeachBubble";
import Doctor1 from "../../../assets/doctorMain.png";
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";

const DetailedOverview = ({
  visionTestResults,
  leftEyeScore,
  rightEyeScore,
}: {
  visionTestResults: VisionTestStateType | any;
  leftEyeScore: string;
  rightEyeScore: string;
}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const getLabelsBasedOnLogmar = (logmar: number) => {
    if (logmar <= 0.1) {
      return "Normal";
    }
    if (logmar <= 0.3) {
      return "Mild";
    }
    if (logmar <= 0.5) {
      return "Moderate";
    }
    if (logmar <= 1) {
      return "Severe";
    }
    return "Blind";
  };

  const getLabelColor = (logmar: number) => {
    if (logmar <= 0.1) {
      return "green";
    }
    if (logmar <= 0.3) {
      return "lightblue";
    }
    if (logmar <= 0.5) {
      return "yellow";
    }
    if (logmar <= 1) {
      return "orange";
    }
    return "red";
  };

  const handleCloseModal = () => {
    Speech.stop(); // Stop the speech when closing the modal
    setModalVisible(false);
  };

  // Function to narrate the message based on the logMAR score
  const narrateMessage = (message: string) => {
    Speech.speak(message, {
      voice: "en-us-x-sfg-local",
      pitch: 1.0,
      rate: 1.0,
    });
  };

  useEffect(() => {
    if (modalVisible) {
      const message =
        parseFloat(leftEyeScore) <= 0.1
          ? "Your vision is really impressive! Keep it up!"
          : parseFloat(leftEyeScore) <= 0.3
          ? "Your vision is quite good, but there's a slight reduction. Let's continue monitoring it."
          : parseFloat(leftEyeScore) <= 0.5
          ? "There's a noticeable reduction in your vision. We should discuss corrective measures like glasses."
          : parseFloat(leftEyeScore) <= 1.0
          ? "Your vision shows significant impairment. It's important to schedule a thorough examination."
          : "Your vision has deteriorated substantially. We need to explore treatment options immediately.";

      narrateMessage(message);
    }
  }, [modalVisible]);
  return (
    <View>
      <Text style={styles.titleText}>Detailed Overview</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: Dimensions.get("window").height * 0.6,
          width: "100%",
          backgroundColor: "transparent",
        }}
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Eye Scores based on logmar values
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Left Eye: {leftEyeScore} :{" "}
              <Text
                style={{
                  color: getLabelColor(parseFloat(leftEyeScore)),
                }}
              >
                {getLabelsBasedOnLogmar(parseFloat(leftEyeScore))}
              </Text>
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Right Eye: {rightEyeScore} :{" "}
            <Text
              style={{
                color: getLabelColor(parseFloat(rightEyeScore)),
              }}
            >
              {getLabelsBasedOnLogmar(parseFloat(rightEyeScore))}
            </Text>
          </Text>

          <Text>
            {
              "Note: The logmar score is calculated based on the last visible letter and the number of errors made"
            }
          </Text>
        </View>
        {Object.keys(visionTestResults.testResults.leftEye.result).map(
          (key) => {
            return (
              <View key={key}>
                <VisionTestResultSingleCard
                  size={key}
                  leftEyeScore={
                    visionTestResults.testResults.leftEye.result[key]
                  }
                  rightEyeScore={
                    visionTestResults.testResults.rightEye.result[key]
                  }
                />
              </View>
            );
          }
        )}
      </ScrollView>

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
              message={
                parseFloat(leftEyeScore) <= 0.1
                  ? "Your vision is really impressive! Keep it up!"
                  : parseFloat(leftEyeScore) <= 0.3
                  ? "Your vision is quite good, but there's a slight reduction. Let's continue monitoring it."
                  : parseFloat(leftEyeScore) <= 0.5
                  ? "There's a noticeable reduction in your vision. We should discuss corrective measures like glasses."
                  : parseFloat(leftEyeScore) <= 1.0
                  ? "Your vision shows significant impairment. It's important to schedule a thorough examination."
                  : "Your vision has deteriorated substantially. We need to explore treatment options immediately."
              }
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

export default DetailedOverview;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
