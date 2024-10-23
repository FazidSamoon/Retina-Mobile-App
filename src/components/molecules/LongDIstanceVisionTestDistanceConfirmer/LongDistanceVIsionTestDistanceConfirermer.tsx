import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FaceDetectorComponenet from "../FaceDetector/FaceDetector";
import { PersonalizedDistance } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import SpeechBubble from "../../organisms/VisionHomeScreenContainer/SpeachBubble";
import Doctor1 from "../../../assets/doctorMain.png";
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const LongDistanceVIsionTestDistanceConfirermer = ({
  personalizedDistance,
  setSteps,
}: {
  personalizedDistance: PersonalizedDistance;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {

  const [inRange, setInRange] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const previousInRangeState = useRef(inRange);

  // Debounced distance checker to avoid multiple rapid state changes
  const debouncedInRangeHandler = useRef(
    debounce((inRangeState) => {
      if (previousInRangeState.current !== inRangeState) {
        setInRange(inRangeState);
        if (inRangeState) {
          setShowConfirmModal(true);
        } else {
          setShowConfirmModal(false);
        }
        previousInRangeState.current = inRangeState;
      }
    }, 500)
  ).current;

  const handleInRange = () => {
    debouncedInRangeHandler(true);
  };

  const handleNotInRange = () => {
    debouncedInRangeHandler(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (inRange && showConfirmModal) {
      timer = setTimeout(() => {
        setSteps(VisionTestFlows.TEST_SCREEN);
      }, 5000); // Proceed to next step after 5 seconds in range
    }

    return () => {
      clearTimeout(timer);
    };
  }, [inRange, showConfirmModal]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
      }, 6000); // Auto-hide the modal after 6 seconds
    }
    return () => {
      clearTimeout(timer);
    };
  }, [modalVisible]);

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
        `Now keep your phone ${personalizedDistance} m away from you! And get ready! We are going to check your left eye first.`
      );
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    Speech.stop();
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "800",
        }}
      >
        Maintain {personalizedDistance}m with device to continue with the test
      </Text>
      <View
        style={{
          ...styles.camearaContainer,
          backgroundColor: inRange ? "green" : "red",
        }}
      >
        <FaceDetectorComponenet
          handleInRange={handleInRange}
          handleNotInRange={handleNotInRange}
          distanceToMaintain={Number(personalizedDistance)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => {
          setShowConfirmModal(false);
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.7,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Please close your RIGHT eye
            </Text>
            <Image
              source={require("../../../assets/CloseRightEye.png")}
              style={{
                width: Dimensions.get("window").width * 0.6,
                height: Dimensions.get("window").height * 0.4,
              }}
            />
          </View>
        </View>
      </Modal>

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
              message={`Now keep your phone ${personalizedDistance} m away from you! And get ready!`}
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

export default LongDistanceVIsionTestDistanceConfirermer;

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("window").height - 100,
    width: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  camearaContainer: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
