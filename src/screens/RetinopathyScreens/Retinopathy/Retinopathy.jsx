import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import RetinopathyInfo from "./RetinopathyComponents/RetinopathyInfo";

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
              <Text style={styles.progressText}>Processing {ocrProgress}%</Text>
            </View>
          )}

          {/* General Loading Indicator */}
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          )}

          {/* Display Extracted Text */}
          {extractedText !== "" && (
            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() => setShowExtractedTextModal(true)}
            >
              <Text style={styles.transparentButtonText}>
                View full Extracted Text
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
                <Text style={styles.label}>Diabetes Type</Text>
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
                <Text style={styles.label}>Systolic (60-200) </Text>
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
                <Text style={styles.label}>Diastolic (40-200) </Text>
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
                <Text style={styles.label}>HbA1c (0.0-12.0%) (mmol/mol)</Text>
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
                <Text style={styles.label}>Estimated Avg Glucose (mg/dL)</Text>
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
              <Text style={styles.label}>Diabetes Diagnosis Year</Text>
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

                    <View style={styles.profileSection}>
                      <Image
                        source={{
                          uri: "https://pics.craiyon.com/2023-10-19/ebd05cc8b06f4c439bccef6994f74fc1.webp",
                        }} // Replace with actual image
                        style={styles.profileImage}
                      />
                      <View>
                        <Text style={styles.doctorName}>Dr. Jonny Wilson</Text>
                        <View style={styles.verifiedSection}>
                          <Text style={styles.specialization}>
                            Ophthalmologist
                          </Text>
                          <FontAwesome
                            name="check-circle"
                            size={18}
                            color="#007bff"
                            style={styles.iconVerified}
                          />
                        </View>
                        <View style={styles.locationSection}>
                          <FontAwesome
                            name="map-marker"
                            size={18}
                            color="#777"
                          />
                          <Text style={styles.location}>
                            Colombo, Sri Lanka
                          </Text>
                        </View>
                      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    borderColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  imagePicker: {
    width: "85%",
    height: 145,
    borderRadius: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: "100%",

    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  imagePickerText: {
    fontSize: 16,
    color: "#999",
  },
  orText: {
    fontSize: 16,
    color: "#999",
    marginVertical: 10,
  },
  cameraButton: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraButtonText: {
    color: "#109BE7",
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#109BE7",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    borderRadius: 10,
    height: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  predictionContainer: {
    marginTop: 20,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    color: "#ff6347",
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  extractedTextContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  extractedTextLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  extractedText: {
    fontSize: 16,
    color: "#333",
  },
  transparentButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,

    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#109BE7",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    height: 45,
  },
  transparentButtonText: {
    color: "#109BE7",
    fontSize: 16,
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
  stepImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

  // Styles for ReviewSummary component

  reviewSummaryContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  verifiedSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconVerified: {
    marginLeft: 5,
  },
  specialization: {
    fontSize: 16,
    color: "#777",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  pricingSection: {
    marginBottom: 20,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pricingText: {
    fontSize: 16,
    color: "#555",
  },
  price: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paymentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentIconSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  changeText: {
    fontSize: 16,
    color: "#007bff",
  },

  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});
