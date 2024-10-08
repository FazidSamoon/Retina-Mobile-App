import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function DiabaticInfo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Updated steps with detailed information
  const steps = [
    {
      title: "Step 1: Pregnancies",
      image: require("../../../assets/1.gif"),
      instructions: [
        "Enter the number of pregnancies.",
        "This is the total number of times the individual has been pregnant."
      ],
      explanation: {
        main: "Pregnancy can influence the risk of developing diabetes due to hormonal changes.",
        howToObtain: "Ask the patient to provide their pregnancy history.",
        formula: "No formula required.",
      },
    },
    {
      title: "Step 2: Glucose (mg/dL)",
      image: require("../../../assets/2.gif"),
      instructions: [
        "Provide the blood glucose level in mg/dL.",
        "Normal fasting glucose levels should be between 70-99 mg/dL."
      ],
      explanation: {
        main: "High glucose levels indicate poor blood sugar control, which can lead to complications.",
        howToObtain: "The patient should undergo a fasting blood glucose test, which is usually done in a laboratory.",
        formula: "No specific formula; the value is measured directly.",
      },
    },
    {
      title: "Step 3: Blood Pressure (mm Hg)",
      image: require("../../../assets/3.gif"),
      instructions: [
        "Enter the systolic and diastolic blood pressure values.",
        "Blood pressure is measured in mm Hg."
      ],
      explanation: {
        main: "High blood pressure increases the risk of diabetes-related complications.",
        howToObtain: "Use a sphygmomanometer or electronic blood pressure monitor to measure blood pressure.",
        formula: "Systolic / Diastolic (e.g., 120/80 mm Hg).",
      },
    },
    {
      title: "Step 4: Skin Thickness (mm)",
      image: require("../../../assets/4.gif"),
      instructions: [
        "Enter the skin thickness measurement in mm.  ",
        "This measurement is used to assess body fat."
      ],
      explanation: {
        main: "Increased skin thickness can indicate insulin resistance.",
        howToObtain: "Use a caliper to measure the thickness of the skin at the triceps area.",
        formula: "No specific formula; the value is measured directly.",
      },
    },
    {
      title: "Step 5: Diabetes Pedigree Function",
      image: require("../../../assets/5.gif"),
      instructions: [
        "Input the diabetes pedigree function score.",
        "This score indicates the family history of diabetes."
      ],
      explanation: {
        main: "Family history plays a significant role in the risk of developing diabetes.",
        howToObtain: "Gather family medical history, focusing on diabetes diagnosis in first-degree relatives.",
        formula: "No formula; the score is based on family history.",
      },
    },
    {
      title: "Step 6: Insulin (μU/mL)",
      image: require("../../../assets/6.gif"),
      instructions: [
        "Enter the insulin level in micro-units per milliliter.",
        "This measures the body's insulin production."
      ],
      explanation: {
        main: "Insulin levels can indicate how well the body is able to use glucose.",
        howToObtain: "A blood test can measure insulin levels, usually taken after fasting.",
        formula: "No specific formula; the value is measured directly.",
      },
    },
    {
      title: "Step 7: BMI (Body Mass Index) kg/m²",
      image: require("../../../assets/6.gif"),
      instructions: [
        "Calculate and enter the BMI.",
        "BMI is calculated as weight in kg divided by height in meters squared."
      ],
      explanation: {
        main: "A high BMI can indicate obesity, a major risk factor for diabetes.",
        howToObtain: "Measure the patient's weight and height.",
        formula: "BMI = weight (kg) / (height (m))²",
      },
    },
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
            <FontAwesome name="info-circle" size={64} color="#D3D3D3" />
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

                {/* Explanation of Each Value */}
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationTitle}>Explanation:</Text>
                  <Text style={styles.explanationText}>
                    {steps[currentStep].explanation.main}
                  </Text>
                  <Text style={styles.explanationTitle}>How to Obtain:</Text>
                  <Text style={styles.explanationText}>
                    {steps[currentStep].explanation.howToObtain}
                  </Text>
                  <Text style={styles.explanationTitle}>Formula:</Text>
                  <Text style={styles.explanationText}>
                    {steps[currentStep].explanation.formula}
                  </Text>
                </View>

                {/* Render Page Indicator */}
                {renderPageIndicator()}

                <View style={styles.buttonRow}>
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
  },
  instructionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  stepImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  explanationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    width: "100%",
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  explanationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#109BE7",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  circleButton: {
    backgroundColor: "#109BE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#f44336",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
