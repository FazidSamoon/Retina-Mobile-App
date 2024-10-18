import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Importing FontAwesome
import RetinopathyHomeScreenTopAppBar from "../TopBar/RetinopathyHomeScreenTopAppBar";

export default function DiabaticResult({ route, navigation }) {
  const { responseData, formData } = route.params; // Destructure formData from route.params

  // Extract the summary from responseData
  const predictionResult = responseData?.summary; // Use the correct key to access the summary

  // Choose an emoji based on the prediction result
  const emoji = predictionResult === "Diabetes positive" ? "⚠️" : "✅"; // ⚠️ for positive diabetes, ✅ for negative

  return (

    <>
    
      <RetinopathyHomeScreenTopAppBar header={"Prediction"} />
    <ScrollView contentContainerStyle={styles.container}>

   {/* Emoji feedback based on prediction result */}
   <Text style={styles.emojiResult}>
        {emoji} {predictionResult}
      </Text>

      <View style={styles.hr} />
      {formData && (
        <View style={styles.responseDataContainer}>
          {Object.entries(formData).map(([key, value]) => (
            <View style={styles.infoRow} key={key}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.hr} />
      
    

      {/* Conditional rendering based on prediction result */}
      {predictionResult === "Diabetes positive" ? (
        <View style={styles.paymentSection}>
          <View style={styles.paymentIconSection}>
            <FontAwesome name="eye" size={18} color="#007bff" />
            <Text style={styles.paymentText}>Check Retinopathy </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Retinopathy")}
          >
            <Text style={styles.changeText}>View Retinopathy</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.paymentSection}>
          <View style={styles.paymentIconSection}>
            <FontAwesome name="forward" size={18} color="#007bff" />
            <Text style={styles.paymentText}>Health Tips</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("HealthTips")}>
            <Text style={styles.changeText}>View Health Tips</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  statusLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f", // High risk level color
    marginBottom: 16,
  },
  responseDataContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  emojiResult: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
