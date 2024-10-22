import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import ClinicalTrailHome from "../TopBar/ClinicalTrailHome";

const MedicalSurveyForm = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    gender: "Male",
    diabetesType: "Type 1",
    systolicBP: 120,
    diastolicBP: 80,
    hbA1c: 90,
    estimatedAvgGlucose: 150,
    diagnosisYear: 2014,
    retinopathyStatus: "No",
    retinopathyProbability: 0.0,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      Alert.alert("Submitting...");

      const response = await fetch(`http://155.248.225.224:8093/submit-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert("Thank you for your contribution!");
      } else {
        Alert.alert("Submission failed, please try again.");
      }
    } catch (error) {
      Alert.alert("An error occurred. Please try again later.");
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

  const retinopathyOptions = [
    { label: "No", value: "No" },
    { label: "Mild Non-Proliferative", value: "Mild Non-Proliferative" },
    {
      label: "Moderate Non-Proliferative",
      value: "Moderate Non-Proliferative",
    },
    { label: "Severe Non-Proliferative", value: "Severe Non-Proliferative" },
    { label: "Proliferative", value: "Proliferative" },
  ];

  const retinopathyProbabilityOptions = [
    { label: "0", value: 0 },
    { label: "0.5", value: 0.5 },
    { label: "1.5", value: 1.5 },
    { label: "2.5", value: 2.5 },
    { label: "3.5", value: 3.5 },
    { label: "4.5", value: 4.5 },
  ];

  return (
    <>
      <ClinicalTrailHome header={"Medical Survey Form"} />
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          {/* Gender Dropdown */}
          <Text style={styles.label}>Gender</Text>
          <Dropdown
            style={styles.dropdown}
            data={genderOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={(item) => handleChange("gender", item.value)}
          />

          {/* Diabetes Type Dropdown */}
          <Text style={styles.label}>Diabetes Type</Text>
          <Dropdown
            style={styles.dropdown}
            data={diabetesOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Diabetes Type"
            value={formData.diabetesType}
            onChange={(item) => handleChange("diabetesType", item.value)}
          />

          {/* Systolic BP */}
          <Text style={styles.label}>Systolic BP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(formData.systolicBP)}
            onChangeText={(value) => handleChange("systolicBP", value)}
          />

          {/* Diastolic BP */}
          <Text style={styles.label}>Diastolic BP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(formData.diastolicBP)}
            onChangeText={(value) => handleChange("diastolicBP", value)}
          />

          {/* HbA1c */}
          <Text style={styles.label}>HbA1c (mmol/mol)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(formData.hbA1c)}
            onChangeText={(value) => handleChange("hbA1c", value)}
          />

          {/* Estimated Avg Glucose */}
          <Text style={styles.label}>Estimated Avg Glucose (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(formData.estimatedAvgGlucose)}
            onChangeText={(value) => handleChange("estimatedAvgGlucose", value)}
          />

          {/* Diagnosis Year */}
          <Text style={styles.label}>Diagnosis Year</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(formData.diagnosisYear)}
            onChangeText={(value) => handleChange("diagnosisYear", value)}
          />

          {/* Retinopathy Status Dropdown */}
          <Text style={styles.label}>Retinopathy Status</Text>
          <Dropdown
            style={styles.dropdown}
            data={retinopathyOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Retinopathy Status"
            value={formData.retinopathyStatus}
            onChange={(item) => handleChange("retinopathyStatus", item.value)}
          />

          {/* Retinopathy Probability Dropdown */}
          <Text style={styles.label}>Retinopathy Probability</Text>
          <Dropdown
            style={styles.dropdown}
            data={retinopathyProbabilityOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Retinopathy Probability"
            value={formData.retinopathyProbability}
            onChange={(item) =>
              handleChange("retinopathyProbability", item.value)
            }
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Retinopathy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  form: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    marginBottom: 16,
  },
  dropdown: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 10,
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
});

export default MedicalSurveyForm;
