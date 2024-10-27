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
import { Dropdown } from "react-native-element-dropdown";
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import LoadingSpinner from "../../../components/atoms/LoadingSpinner/LoadingSpinner";
import TestLoadingRetinopathy from "../Components/LoadingRetinopathy";
import ClinicalTrailHome from "../TopBar/ClinicalTrailHome";

const server_name = "http://155.248.225.224:8093";

const SurvayPrediction = () => {
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

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const diabetesOptions = [
    { label: "Type 1", value: "Type 1" },
    { label: "Type 2", value: "Type 2" },
  ];

  return (
    <View style={styles.container}>
      <ClinicalTrailHome header={"Public Retinopathy model"} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Gender</Text>
          <Dropdown
            style={styles.dropdown}
            data={genderOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={(item) => handleChange("gender", item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemTextStyle}
            maxHeight={120}
          />

          <Text style={styles.label}>Diabetes Type</Text>
          <Dropdown
            style={styles.dropdown}
            data={diabetesOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Diabetes Type"
            value={formData.diabetesType}
            onChange={(item) => handleChange("diabetesType", item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemTextStyle}
            maxHeight={120}
          />

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

          {prediction && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{prediction}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Retinopathy</Text>
          </TouchableOpacity>

          {loading && <TestLoadingRetinopathy />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
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
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
  },
  itemTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#109BE7",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    borderRadius: 10,
    height: 55,
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
    borderRadius: 15,
  },
  resultText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default SurvayPrediction;
