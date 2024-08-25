import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
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
import axios from "axios";
import { useNavigation } from "expo-router";

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

  const [predValue, setPredValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setExtractedText(result["all_text"]);
        populateFormFields(result["all_text"]);
      })
      .catch((error) => console.log("error", error))
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

  const handleSubmit = async () => {
    setLoading(true);
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
    try {
      const response = await axios.post(
        "http://192.168.8.159:5000/predict-diabetes",
        { data: formattedData }
      );
      console.log(response.data);
      setPredValue(response.data.prediction);
      setResponseData(response.data);
      navigation.navigate("ResultScreen", {
        prediction: response.data.prediction,
        responseData: response.data,
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
    <PaperProvider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Diabatic checker</Text>
          <Button
            title="Pick an image from gallery"
            onPress={pickImageGallery}
          />
          <Button title="Pick an image from camera" onPress={pickImageCamera} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 400, height: 300, objectFit: "contain" }}
            />
          )}
          {imageLoading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          )}

          <Button
            title="Show Extracted Details"
            onPress={() => setModalVisible(true)}
          />

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
              {loading && (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  size="large"
                  color="#0000ff"
                />
              )}

              <View style={styles.buttonContainer}>
                {/* <Button title="Predict" onPress={handleSubmit} /> */}

                <Button
                  title="ResultScreen"
                  onPress={() => navigation.navigate("ResultScreen")}
                />
              </View>

              <ScrollView>
                <View style={styles.container}>
                  <View style={styles.inputContainer}>
                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pregnancies</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Pregnancies"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("pregnancies", text)
                          }
                          value={formData.pregnancies}
                        />
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>Glucose</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Enter Glucose"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("glucose", text)
                            }
                            value={formData.glucose}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Blood Pressure</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Blood Pressure"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("bloodPressure", text)
                          }
                          value={formData.bloodPressure}
                        />
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>Skin Thickness</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Enter Skin Thickness"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("skinThickness", text)
                            }
                            value={formData.skinThickness}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Insulin</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Insulin"
                          keyboardType="numeric"
                          onChangeText={(text) =>
                            handleInputChange("insulin", text)
                          }
                          value={formData.insulin}
                        />
                      </View>

                      <View style={styles.inputGroup}>
                        <View>
                          <Text style={styles.label}>BMI</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Enter BMI"
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleInputChange("bmi", text)
                            }
                            value={formData.bmi}
                          />
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.label}>Diabetes Pedigree</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Diabetes Pedigree"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleInputChange("diabetesPedigree", text)
                        }
                        value={formData.diabetesPedigree}
                      />
                    </View>

                    <View>
                      <Text style={styles.label}>Age</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Age"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("age", text)}
                        value={formData.age}
                      />
                    </View>
                  </View>

                  {loading && (
                    <ActivityIndicator
                      style={styles.loadingIndicator}
                      size="large"
                      color="#0000ff"
                    />
                  )}

                  {/* <View style={styles.buttonContainer}>
                  <Button title="Predict" onPress={handleSubmit} />
                </View> */}

                  <TouchableOpacity style={styles.button}>
                    <Text
                      title="Predict"
                      onPress={handleSubmit}
                      style={styles.buttonText}
                    >
                      Predict Diabetic Retinopathy
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ScrollView>

          <StatusBar style="auto" />
        </SafeAreaView>
      </ScrollView>
    </PaperProvider>
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
    fontWeight: "bold", // Make label text bold
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});