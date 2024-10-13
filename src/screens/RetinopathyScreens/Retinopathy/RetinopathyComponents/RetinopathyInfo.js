import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//import * as ImagePicker from "expo-image-picker";

export default function RetinopathyInfo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // New state for the current step
  const steps = [
    {
      title: "Step 1: Take the Clinical Report",
      image: require("../../../../assets/1.gif"), // Replace with appropriate image
      instructions: [
        "Make sure you have the clinical data report ready.",
        "Place the report in good lighting for the next steps.",
      ],
    },
    {
      title: "Step 2: Focus on the Text",
      image: require("../../../../assets/2.gif"), // Replace with appropriate image
      instructions: [
        "Ensure the text on the report is in focus for a clear capture.",
        "Adjust the angle and distance if necessary for a sharp image.",
      ],
    },
    {
      title: "Step 3: Capture the Image",
      image: require("../../../../assets/3.gif"), // Replace with appropriate image
      instructions: [
        "Press the shutter button to take the photo of the report.",
        "Make sure the entire report is captured clearly.",
      ],
    },
    {
      title: "Step 4: Check the Form Fields",
      image: require("../../../../assets/4.gif"), // Replace with appropriate image
      instructions: [
        "Ensure that the form fields have fetched the data correctly.",
        "Review all the fields and make sure the extracted values match the report.",
      ],
    },
    {
      title: "Step 5: Look for Error Messages",
      image: require("../../../../assets/5.gif"), // Replace with appropriate image
      instructions: [
        "Check if there are any error messages or warnings on the form.",
        "If errors are found, correct them and retry capturing the report.",
      ],
    },
    {
      title: "Step 6: Predict the Results",
      image: require("../../../../assets/6.gif"), // Replace with appropriate image
      instructions: [
        "Once all fields are filled correctly and no errors are present, click the 'Predict' button.",
        "Wait for the results and review the predictions.",
      ],
    },
    // Add more steps as needed
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderPageIndicator = () => {
    return (
      <View style={styles.pageIndicatorContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicatorDot,
              currentStep === index && styles.pageIndicatorDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerButtons}>
          {/* Info Button */}

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.topButton}
          >
            <FontAwesome name="info-circle" size={24} color="#D3D3D3" />
          </TouchableOpacity>

          {/* Modal for Displaying Information */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  {steps[currentStep].title}
                </Text>
                <Image
                  source={steps[currentStep].image}
                  style={styles.stepImage}
                />

                <View style={styles.instructionContainer}>
                  {steps[currentStep].instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionText}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </View>

                {/* Combined Page Indicator and Buttons */}
                <View style={styles.navigationRow}>
                  <TouchableOpacity
                    style={[
                      styles.circleButton,
                      { opacity: currentStep === 0 ? 0.5 : 1 },
                    ]}
                    disabled={currentStep === 0}
                    onPress={handlePrevious}
                  >
                    <FontAwesome name="chevron-left" size={20} color="#fff" />
                  </TouchableOpacity>

                  {renderPageIndicator()}

                  <TouchableOpacity
                    style={[
                      styles.circleButton,
                      { opacity: currentStep === steps.length - 1 ? 0.5 : 1 },
                    ]}
                    disabled={currentStep === steps.length - 1}
                    onPress={handleNext}
                  >
                    <FontAwesome name="chevron-right" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 20,
    backgroundColor: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
    paddingTop: 10,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "90%",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "left",
  },
  navigationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#109BE7",
    justifyContent: "center",
    alignItems: "center",
    // Removed borderColor and borderWidth as they are not needed
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    height: 45,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#109BE7",
  },
  stepImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
});
