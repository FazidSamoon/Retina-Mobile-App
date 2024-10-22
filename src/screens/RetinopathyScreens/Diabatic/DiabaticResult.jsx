import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Importing FontAwesome
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import DiabaticHomeScreenTopAppBar from "../TopBar/DiabaticHomeScreenTopAppBar";

export default function DiabaticResult({ route, navigation }) {
  const { responseData, formData } = route.params; // Destructure formData from route.params

  // Extract the summary from responseData
  const predictionResult = responseData?.summary; // Use the correct key to access the summary

  // Choose GIFs based on the prediction result
  const positiveGif = require("../../../assets/negative.gif"); // Local GIF file for positive result
  const negativeGif = require("../../../assets/positive.gif"); // Local GIF file for negative result

 

  return (
    <>
    
      <DiabaticHomeScreenTopAppBar header={"Diabates Prediction"} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* GIF feedback based on prediction result */}
        <View style={styles.gifContainer}>
          <Image
            source={
              predictionResult === "Diabetes positive"
                ? positiveGif
                : negativeGif
            }
            style={styles.resultGif}
          />
          <Text style={styles.resultText}>
            {predictionResult === "Diabetes positive"
              ? "You may be at risk of Diabetes"
              : "Your results look good! Stay Healthy!"}
          </Text>
        </View>
        <Text style={styles.resultText}>Summary</Text>
        <View style={styles.hr} />

        {formData && (
          <View style={styles.responseDataContainer}>
            {Object.entries(formData).map(([key, value]) => (
              <View style={styles.infoRow} key={key}>
                {/* Render icon if available in the iconMap */}
             
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.hr} />

        {/* Conditional rendering based on prediction result */}
        {predictionResult === "Diabetes positive" ? (
          <View>
            {/* Retinopathy Section */}
            <View style={styles.paymentSection}>
              <View style={styles.paymentIconSection}>
                <FontAwesome name="eye" size={18} color="#444" />
                <Text style={styles.paymentText}>Check Retinopathy</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Retinopathy")}
              >
                <Text style={styles.changeText}>View Retinopathy</Text>
              </TouchableOpacity>
            </View>

            {/* Doctor Channel Section */}
            <View style={styles.paymentSection}>
              <View style={styles.paymentIconSection}>
                <FontAwesome name="user-md" size={18} color="#444" />
                <Text style={styles.paymentText}>Doctor Channel</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChannelDoctorsScreen")}
              >
                <Text style={styles.changeText}>Contact a Doctor</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.paymentSection}>
              <View style={styles.paymentIconSection}>
                <FontAwesome name="forward" size={23} color="#444" />
                <Text style={styles.paymentText}>Health Tips</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("HealthTips")}
              >
                <Text style={styles.changeText}>View Health Tips</Text>
              </TouchableOpacity>
            </View>

            {/* Doctor Channel Section */}
            <View style={styles.paymentSection}>
              <View style={styles.paymentIconSection}>
                <FontAwesome name="magic" size={23} color="#444" />
                <Text style={styles.paymentText}>Recommendations</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("RecommendHome")}
              >
                <Text style={styles.changeText}>View </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.hr} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",




  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  resultGif: {
    width: 280,
    height: 180,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  responseDataContainer: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#444",
    flex: 1, // Allows key to take available space
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right", // Aligns value text to the right
    flex: 1, // Allows value to take available space
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
