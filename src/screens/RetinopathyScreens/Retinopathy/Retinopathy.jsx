import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  Vibration,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import AvgGlucose from "./RetinopathyVariables/AvgGlucose";
import DiabetesType from "./RetinopathyVariables/DiabetesType";
import DiagnosisYear from "./RetinopathyVariables/DiagnosisYear";
import DiastolicBp from "./RetinopathyVariables/DiastolicBp";
import Hba1c from "./RetinopathyVariables/Hba1c";
import SystolicBp from "./RetinopathyVariables/SystolicBp";
import RetinopathyInfo from "../Components/RetinopathyInfo";
import TestLoadingScreen from "../Components/LoadingScreen";
import TestLoadingRetinopathy from "../Components/LoadingRetinopathy";
import styles from "../Retinopathy/RetinopathyStyles";
import RetinopathyHomeScreenTopAppBar0 from "../TopBar/PredictHomeTopAppBar";

export default function Retinopathy() {
  const navigation = useNavigation();
  const [gender, setGender] = useState("");
  const [diabetesType, setDiabetesType] = useState("Type 2");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [hbA1c, setHbA1c] = useState("");
  const [avgGlucose, setAvgGlucose] = useState("");
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [prediction, setPrediction] = useState("");
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showExtractedTextModal, setShowExtractedTextModal] = useState(false); // New state for extracted text modal
  // State to track the number of scans performed
  const [scanCount, setScanCount] = useState(0);
  const [imageLoading, setImageLoading] = useState(false); // New state for image loading

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setOcrLoading(true); // Start OCR loading
      setOcrProgress(0); // Reset progress
      simulateOcrProgress(); // Start simulating progress
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setOcrLoading(true); // Start OCR loading
      setOcrProgress(0); // Reset progress
      simulateOcrProgress(); // Start simulating progress
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20"); // Replace with your API key
    myHeaders.append("Content-Type", "multipart/form-data");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: file,
    };

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOcrLoading(false); // Stop OCR loading
        setOcrProgress(100); // Set progress to 100% upon completion
        setLoading(false); // Hide loading indicator
        const extractedText = result["all_text"];
        setExtractedText(extractedText); // Set the extracted text

        // Parse and auto-fill the form
        const parsedData = parseExtractedText(extractedText);
        if (!gender) setGender(parsedData.gender || "");
        if (!diabetesType) setDiabetesType(parsedData.diabetesType || "Type 2"); // Default to "Type 2" if not found
        if (!systolicBP) setSystolicBP(parsedData.systolicBP || "");
        if (!diastolicBP) setDiastolicBP(parsedData.diastolicBP || "");
        if (!hbA1c) setHbA1c(parsedData.hbA1c || "");
        if (!avgGlucose) setAvgGlucose(parsedData.avgGlucose || "");
        if (!diagnosisYear) setDiagnosisYear(parsedData.diagnosisYear || "");

        // Update scan count
        setScanCount(scanCount + 1);
      })
      .catch((error) => {
        setOcrLoading(false); // Stop OCR loading on error
        setLoading(false); // Hide loading indicator on error
        setOcrProgress(0); // Reset progress on error
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred while performing OCR");
      });
  };

  const simulateOcrProgress = () => {
    const interval = setInterval(() => {
      setOcrProgress((prev) => {
        if (prev < 90) {
          return prev + 10; // Increment by 10 until 90%
        } else {
          clearInterval(interval); // Stop incrementing once it reaches 90%
          return prev;
        }
      });
    }, 500); // Update every 500ms
  };

  const parseExtractedText = (text) => {
    const data = {};

    const genderMatch = text.match(/Gender:\s*(\w+)/i);
    const diabetesTypeMatch = text.match(/Diabetes Type:\s*(Type \d)/i);
    const systolicBPMatch = text.match(/Systolic BP:\s*(\d+)/i);
    const diastolicBPMatch = text.match(/Diastolic BP:\s*(\d+)/i);
    const hbA1cMatch = text.match(/HbA1c \(mmol\/mol\):\s*(\d+)/i);
    const avgGlucoseMatch = text.match(
      /Estimated Avg Glucose \(mg\/dL\):\s*(\d+)/i
    );
    const diagnosisYearMatch = text.match(/Diagnosis Year:\s*(\d{4})/i);

    if (genderMatch) data.gender = genderMatch[1];
    if (diabetesTypeMatch) data.diabetesType = diabetesTypeMatch[1];
    if (systolicBPMatch) data.systolicBP = systolicBPMatch[1];
    if (diastolicBPMatch) data.diastolicBP = diastolicBPMatch[1];
    if (hbA1cMatch) data.hbA1c = hbA1cMatch[1];
    if (avgGlucoseMatch) data.avgGlucose = avgGlucoseMatch[1];
    if (diagnosisYearMatch) data.diagnosisYear = diagnosisYearMatch[1];

    return data;
  };

  useEffect(() => {
    validateForm();
  }, [gender, systolicBP, diastolicBP, hbA1c, avgGlucose, diagnosisYear]);

  const validateForm = () => {
    let errors = {};
    if (!gender) errors.gender = "Gender is required.";
    if (!systolicBP) errors.systolicBP = "Systolic BP is required.";
    else if (isNaN(systolicBP) || systolicBP <= 0)
      errors.systolicBP = "Systolic BP must be a positive number.";
    if (!diastolicBP) errors.diastolicBP = "Diastolic BP is required.";
    else if (isNaN(diastolicBP) || diastolicBP <= 0)
      errors.diastolicBP = "Diastolic BP must be a positive number.";
    if (!hbA1c) errors.hbA1c = "HbA1c is required.";
    else if (isNaN(hbA1c) || hbA1c <= 0)
      errors.hbA1c = "HbA1c must be a positive number.";
    if (!avgGlucose) errors.avgGlucose = "Estimated Avg Glucose is required.";
    else if (isNaN(avgGlucose) || avgGlucose <= 0)
      errors.avgGlucose = "Estimated Avg Glucose must be a positive number.";
    if (!diagnosisYear) errors.diagnosisYear = "Diagnosis Year is required.";
    else if (
      isNaN(diagnosisYear) ||
      diagnosisYear < 1900 ||
      diagnosisYear > new Date().getFullYear()
    )
      errors.diagnosisYear = "Diagnosis Year must be a valid year.";

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handlePrediction = async () => {
    Vibration.vibrate();
    console.log("Vibration triggered!");
    if (!isFormValid) {
      Alert.alert("Form Error", "Please correct the errors in the form.");
      return;
    }

    try {
      setLoading(true);
      const formData = {
        Gender: [gender],
        "Diabetes Type": [diabetesType],
        "Systolic BP": [parseFloat(systolicBP)],
        "Diastolic BP": [parseFloat(diastolicBP)],
        "HbA1c (mmol/mol)": [parseFloat(hbA1c)],
        "Estimated Avg Glucose (mg/dL)": [parseFloat(avgGlucose)],
        "Diagnosis Year": [parseInt(diagnosisYear)],
      };

      const response = await axios.post(
        "http://155.248.225.224:8091/predict-retinopathy",
        { data: formData }
      );

      setPrediction(response.data.prediction.toString());
      navigation.navigate("RetinopathyResult", {
        prediction: response.data.prediction,
        responseData: formData,
      });
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred while predicting retinopathy");
      Alert.alert("Error", "An error occurred while predicting retinopathy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RetinopathyHomeScreenTopAppBar0 header={"Check For Retinopathy"} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <RetinopathyInfo />

        <View style={styles.container}>
          {/* Image Picker UI */}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={pickImageGallery}
          >
            <View style={styles.imagePlaceholder}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.imagePickerText}>
                  <FontAwesome name="photo" size={24} color="#ccc" /> Select
                  file
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={pickImageCamera}
          >
            <Text style={styles.cameraButtonText}>
              <FontAwesome name="camera" size={20} color="#109BE7" /> Open
              Camera & Take Photo
            </Text>
          </TouchableOpacity>

          {/* OCR Progress Indicator */}
          {ocrLoading && (
            <View style={styles.progressContainer}>
              <TestLoadingScreen />
            </View>
          )}

          {/* General Loading Indicator */}
          {loading && <TestLoadingRetinopathy />}

          {/* Display Extracted Text */}
          {extractedText !== "" && (
            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() => setShowExtractedTextModal(true)}
            >
              <Text style={styles.transparentButtonText}>
                View Extracted Text
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputContainer}>
            {/* Form Inputs */}
            {/* Gender and Diabetes Type */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Gender"
                  value={gender}
                  onChangeText={setGender}
                />
                {errors.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Diabetes Type <DiabetesType />
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Diabetes Type"
                  value={diabetesType}
                  onChangeText={setDiabetesType}
                  editable={false} // Make it non-editable
                />
              </View>
            </View>

            {/* BP Inputs */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Systolic (60-200)
                  <SystolicBp />{" "}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Systolic BP"
                  value={systolicBP}
                  onChangeText={setSystolicBP}
                  keyboardType="numeric"
                />
                {errors.systolicBP && (
                  <Text style={styles.error}>{errors.systolicBP}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Diastolic Bp (40-200) <DiastolicBp />
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Diastolic BP"
                  value={diastolicBP}
                  onChangeText={setDiastolicBP}
                  keyboardType="numeric"
                />
                {errors.diastolicBP && (
                  <Text style={styles.error}>{errors.diastolicBP}</Text>
                )}
              </View>
            </View>

            {/* HbA1c and Avg Glucose Inputs */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  HbA1c(0.0-12.0%) (mmol/mol) <Hba1c />{" "}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="HbA1c (mmol/mol)"
                  value={hbA1c}
                  onChangeText={setHbA1c}
                  keyboardType="numeric"
                />
                {errors.hbA1c && (
                  <Text style={styles.error}>{errors.hbA1c}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Estimated Avg Glucose (mg/dL) <AvgGlucose />
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Glucose"
                  value={avgGlucose}
                  onChangeText={setAvgGlucose}
                  keyboardType="numeric"
                />
                {errors.avgGlucose && (
                  <Text style={styles.error}>{errors.avgGlucose}</Text>
                )}
              </View>
            </View>

            {/* Diagnosis Year Input */}

            <View>
              <Text style={styles.label}>
                Diabetes Diagnosis Year
                <DiagnosisYear />
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Diagnosis Year"
                value={diagnosisYear}
                onChangeText={setDiagnosisYear}
                keyboardType="numeric"
              />
              {errors.diagnosisYear && (
                <Text style={styles.error}>{errors.diagnosisYear}</Text>
              )}
            </View>
          </View>

          {/* Modal for Extracted Text */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showExtractedTextModal}
            onRequestClose={() => setShowExtractedTextModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <ScrollView style={styles.modalContent}>
                  {/* Review Summary Component */}
                  <View style={styles.reviewSummaryContainer}>
                    <View style={styles.header}>
                      <Text style={styles.headerText}>Extracted Text</Text>
                    </View>

                    <View style={styles.hr} />
                    <Text style={styles.extractedText}>{extractedText}</Text>
                    <View style={styles.hr} />
                  </View>
                </ScrollView>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowExtractedTextModal(false)}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
            disabled={!isFormValid}
            onPress={handlePrediction}
          >
            <Text style={styles.buttonText}>Predict Eye Blindness</Text>
          </TouchableOpacity>

          {/* <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>Prediction: {prediction}</Text>
        </View> */}
        </View>
      </ScrollView>
    </>
  );
}
