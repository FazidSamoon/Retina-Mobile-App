import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import RetinopathyHomeScreenTopAppBar from "../TopBar/RetinopathyHomeScreenTopAppBar";

const server_name = "http://155.248.225.224:8093";

const RetinopathyPrediction = () => {
  const [formData, setFormData] = useState({
    gender: "Male",
    diabetesType: "Type 2",
    systolicBP: "120",
    diastolicBP: "80",
    hbA1c: "7",
    estimatedAvgGlucose: "121",
    diagnosisYear: "2019",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      gender: formData.gender,
      diabetesType: formData.diabetesType,
      systolicBP: parseInt(formData.systolicBP, 10),
      diastolicBP: parseInt(formData.diastolicBP, 10),
      hbA1c: parseInt(formData.hbA1c, 10),
      estimatedAvgGlucose: parseInt(formData.estimatedAvgGlucose, 10),
      diagnosisYear: parseInt(formData.diagnosisYear, 10),
    };

    try {
      const response = await fetch(`${server_name}/predict-retinopathy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setLoading(false);

      const predictionMessage =
        parseInt(data.prediction) === 0
          ? "You're not at risk for retinopathy."
          : "You have a possibility of retinopathy.";

      setPrediction(predictionMessage);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  const toggleModal = (field) => {
    setSelectedField(field);
    setModalVisible(!modalVisible);
  };

  const handleSelect = (value) => {
    handleChange(selectedField, value);
    toggleModal("");
  };

  return (
    <View style={styles.container}>
      <RetinopathyHomeScreenTopAppBar header={"Public Retinopathy model"} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity onPress={() => toggleModal("gender")}>
            <TextInput
              style={styles.input}
              editable={false}
              value={formData.gender}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Diabetes Type</Text>
          <TouchableOpacity onPress={() => toggleModal("diabetesType")}>
            <TextInput
              style={styles.input}
              editable={false}
              value={formData.diabetesType}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Systolic BP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.systolicBP}
            onChangeText={(value) => handleChange("systolicBP", value)}
          />

          <Text style={styles.label}>Diastolic BP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.diastolicBP}
            onChangeText={(value) => handleChange("diastolicBP", value)}
          />

          <Text style={styles.label}>HbA1c (mmol/mol)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.hbA1c}
            onChangeText={(value) => handleChange("hbA1c", value)}
          />

          <Text style={styles.label}>Estimated Avg Glucose (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.estimatedAvgGlucose}
            onChangeText={(value) => handleChange("estimatedAvgGlucose", value)}
          />

          <Text style={styles.label}>Diagnosis Year</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.diagnosisYear}
            onChangeText={(value) => handleChange("diagnosisYear", value)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Diabetic</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {prediction && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{prediction}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal("")}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedField === "gender" && (
              <>
                <Text style={styles.modalTitle}>Select Gender</Text>
                <TouchableOpacity onPress={() => handleSelect("Male")}>
                  <Text style={styles.modalButton}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelect("Female")}>
                  <Text style={styles.modalButton}>Female</Text>
                </TouchableOpacity>
              </>
            )}
            {selectedField === "diabetesType" && (
              <>
                <Text style={styles.modalTitle}>Select Diabetes Type</Text>
                <TouchableOpacity onPress={() => handleSelect("Type 1")}>
                  <Text style={styles.modalButton}>Type 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelect("Type 2")}>
                  <Text style={styles.modalButton}>Type 2</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => toggleModal("")}>
              <Text style={styles.modalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // Add some bottom padding to prevent overlap with bottom of screen
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1E90FF",
  },
});

export default RetinopathyPrediction;
