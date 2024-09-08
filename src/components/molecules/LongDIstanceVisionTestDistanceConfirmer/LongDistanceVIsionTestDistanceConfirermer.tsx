import { Dimensions, Modal, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import FaceDetectorComponenet from "../FaceDetector/FaceDetector";
import { PersonalizedDistance } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";

const LongDistanceVIsionTestDistanceConfirermer = ({
  personalizedDistance,
  setSteps,
}: {
  personalizedDistance: PersonalizedDistance;
  setSteps: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
}) => {
  console.log("personalizedDistance ", personalizedDistance);
  const [inRange, setInRange] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleInRange = () => {
    if (!inRange) {
      setInRange(true);
      setShowConfirmModal(true)
    }
  };

  const handleNotInRange = () => {
    if (inRange) setInRange(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (inRange && showConfirmModal) {
      timer = setTimeout(() => {
        setSteps(VisionTestFlows.TEST_SCREEN);
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [inRange, showConfirmModal]);
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
});
