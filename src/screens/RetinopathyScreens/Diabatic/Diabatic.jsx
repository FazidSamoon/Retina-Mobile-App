import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import RetinopathyHomeScreenTopAppBar from "../../../../src/screens/RetinopathyScreens/TopBar/RetinopathyHomeScreenTopAppBar";
import RetinopathyInfo from "../Retinopathy/RetinopathyComponents/RetinopathyInfo";
import DiabetesRiskPrediction from "../Instruction/DiabetesPedigree";
import BMICalculator from "../Instruction/BMICalculator";
import BloodPressureComponent from "./DiabaticVariables/BloodPressureComponent";
import SkinThicknessComponent from "./DiabaticVariables/SkinThicknessComponent";
import GlucoseComponent from "./DiabaticVariables/GlucoseComponent";

export default function Diabatic({ navigation }) {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [predValue, setPredValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [ocrProgress, setOcrProgress] = useState(0);
  const [fetchProgress, setFetchProgress] = useState(0);

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
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
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file) => {
    setImageLoading(true);
    setOcrProgress(0); // Reset progress for new operation
    let myHeaders = new Headers();
    myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20");
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file;
    let requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    };

    // Mock progress for demo purposes
    let progressInterval = setInterval(() => {
      setOcrProgress((prev) => {
        if (prev < 90) {
          return prev + 10; // Increase progress
        } else {
          clearInterval(progressInterval);
          return 90; // Cap at 90% until response is received
        }
      });
    }, 1000);

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOcrProgress(100); // Set progress to 100% on completion
        clearInterval(progressInterval);
        console.log(result);
        if (result.error) {
          Alert.alert("OCR Error", result.error.message);
          console.log("OCR Error:", result.error);
        } else {
          setExtractedText(result["all_text"] || "");
          populateFormFields(result["all_text"] || "");
        }
      })
      .catch((error) => {
        console.log("Network Error", error);
        Alert.alert("Network Error", "Failed to communicate with OCR service.");
      })
      .finally(() => {
        setImageLoading(false);
      });
  };

  const populateFormFields = (extractedText) => {
    const lines = extractedText.split("\n");
    const extractedData = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":").map((item) => item.trim());
      if (key && value) {
        const formattedKey = key.toLowerCase().replace(/\s+/g, "");
        extractedData[formattedKey] = parseFloat(value);
      }
    });

    setFormData({
      pregnancies: extractedData.pregnancies?.toString() || "",
      glucose: extractedData.glucose?.toString() || "",
      bloodPressure: extractedData.bloodpressure?.toString() || "",
      skinThickness: extractedData.skinthickness?.toString() || "",
      insulin: extractedData.insulin?.toString() || "",
      bmi: extractedData.bmi?.toString() || "",
      diabetesPedigree: extractedData.diabetespedigree?.toString() || "",
      age: extractedData.age?.toString() || "",
    });
  };

  const handleInputChange = (name, value) => {
    const sanitizedValue = value.replace(/[^0-9.-]/g, "");
    const numericValue =
      sanitizedValue === "" ? "" : parseFloat(sanitizedValue);

    if (!isNaN(numericValue)) {
      setFormData({ ...formData, [name]: numericValue.toString() });
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (formData[field].trim() === "") {
        newErrors[field] = "This field is required";
        valid = false;
      } else if (isNaN(formData[field])) {
        newErrors[field] = "Please enter a valid number";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFetchProgress(0); // Reset progress for new operation

    const formattedData = [
      parseFloat(formData.pregnancies),
      parseFloat(formData.glucose),
      parseFloat(formData.bloodPressure),
      parseFloat(formData.skinThickness),
      parseFloat(formData.insulin),
      parseFloat(formData.bmi),
      parseFloat(formData.diabetesPedigree),
      parseFloat(formData.age),
    ];

    // Mock progress for demo purposes
    let progressInterval = setInterval(() => {
      setFetchProgress((prev) => {
        if (prev < 90) {
          return prev + 10; // Increase progress
        } else {
          clearInterval(progressInterval);
          return 90; // Cap at 90% until response is received
        }
      });
    }, 1000);

    try {
      const response = await axios.post(
        "http://155.248.225.224:8091/predict-diabetes",
        { data: formattedData }
      );

      setFetchProgress(100); // Set progress to 100% on completion
      clearInterval(progressInterval);
      console.log(response.data);
      setPredValue(response.data.prediction);
      setResponseData(response.data);
      navigation.navigate("ResultScreen", {
        prediction: response.data.prediction,
        responseData: response.data,
        formData: formData,
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch data from server. Please check your network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RetinopathyHomeScreenTopAppBar header={"Current Diabetes Status"} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerButtons}>
            {/* Skip Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Retinopathy")}
              style={styles.topButton}
            >
              <Text style={styles.skipText}>Skip this step</Text>
            </TouchableOpacity>

            <RetinopathyInfo />
          </View>

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
              <FontAwesome name="camera" size={20} color="007BFF" /> Open Camera
              & Take Photo
            </Text>
          </TouchableOpacity>

          {/* Image Loading Progress */}
          {imageLoading && (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.progressText}>Processing {ocrProgress}%</Text>
            </View>
          )}
          {/* Display Extracted Text */}
          {extractedText !== "" && (
            <TouchableOpacity
              style={styles.transparentButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.transparentButtonText}>
                View Extracted Text
              </Text>
            </TouchableOpacity>
          )}

          {/* Modal for Displaying Extracted Text */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Extracted Text</Text>

                <ScrollView style={styles.modalScrollView}>
                  <Text style={styles.modalText}>{extractedText}</Text>
                </ScrollView>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
              {loading && (
                <View style={styles.progressContainer}>
                  <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                    color="#0000ff"
                  />
                  <Text style={styles.progressText}>
                    fetchProgress{fetchProgress}%
                  </Text>
                </View>
              )}

              <ScrollView>
                <View style={styles.container}>
                  <View style={styles.inputContainer}>
                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pregnancies</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Pregnancies"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("pregnancies", text)
                          }
                          value={formData.pregnancies}
                        />
                        {errors.pregnancies && (
                          <Text style={styles.errorText}>
                            {errors.pregnancies}
                          </Text>
                        )}
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>
                            Glucose (mg/dL) <GlucoseComponent />
                          </Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Glucose"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("glucose", text)
                            }
                            value={formData.glucose}
                          />
                          {errors.glucose && (
                            <Text style={styles.errorText}>
                              {errors.glucose}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                          Blood Pressure (mm Hg) <BloodPressureComponent />
                        </Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Blood Pressure"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("bloodPressure", text)
                          }
                          value={formData.bloodPressure}
                        />
                        {errors.bloodPressure && (
                          <Text style={styles.errorText}>
                            {errors.bloodPressure}
                          </Text>
                        )}
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>
                            Skin Thickness (mm) <SkinThicknessComponent />
                          </Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Skin Thickness"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("skinThickness", text)
                            }
                            value={formData.skinThickness}
                          />
                          {errors.skinThickness && (
                            <Text style={styles.errorText}>
                              {errors.skinThickness}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.lab}>
                      <Text style={styles.label}>
                        Diabetes Pedigree <DiabetesRiskPrediction />
                      </Text>

                      <TextInput
                        style={styles.input}
                        placeholder="Diabetes Pedigree"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleInputChange("diabetesPedigree", text)
                        }
                        value={formData.diabetesPedigree}
                      />
                      {errors.diabetesPedigree && (
                        <Text style={styles.errorText}>
                          {errors.diabetesPedigree}
                        </Text>
                      )}
                    </View>

                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Insulin (µU/mL)</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Insulin"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("insulin", text)
                          }
                          value={formData.insulin}
                        />
                        {errors.insulin && (
                          <Text style={styles.errorText}>{errors.insulin}</Text>
                        )}
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>
                            BMI (kg/m²)
                            <BMICalculator />
                          </Text>
                          <TextInput
                            style={styles.input}
                            placeholder="BMI"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("bmi", text)
                            }
                            value={formData.bmi}
                          />
                          {errors.bmi && (
                            <Text style={styles.errorText}>{errors.bmi}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.label}>Age</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Age"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("age", text)}
                        value={formData.age}
                      />
                      {errors.age && (
                        <Text style={styles.errorText}>{errors.age}</Text>
                      )}
                    </View>
                  </View>

                  {loading && (
                    <View style={styles.progressContainer}>
                      <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color="#0000ff"
                      />
                      <Text style={styles.progressText}>{fetchProgress}%</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Predict Diabetic</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  topButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "transparent",
  },
  skipText: {
    color: "#717171",
    fontSize: 16,
    marginLeft: 5,
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
    fontWeight: "bold",
  },
  lab: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  imagePicker: {
    marginTop: 60,
    width: "80%",
    height: 150,
    borderRadius: 10,
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

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  extractedTextContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  extractedTextLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  extractedText: {
    marginTop: 10,
    fontSize: 14,
  },
  transparentButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
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
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalScrollView: {
    marginVertical: 10,
    maxHeight: 200,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#109BE7",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
});
