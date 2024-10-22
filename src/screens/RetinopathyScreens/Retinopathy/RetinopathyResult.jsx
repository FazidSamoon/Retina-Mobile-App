import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Importing FontAwesome
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import styles from "../Retinopathy/RetinopathyResultStyles";
import RetinopathyResultHomeScreenTopAppBar from "../TopBar/RetinopathyResultHomeScreenTopAppBar";
export default function RetinopathyResult({ route, navigation }) {
  const { prediction, responseData } = route.params;

  console.log(prediction);
  // Assuming "1" and 1 are positive, and "0" or 0 are negative
  const isPositive = prediction === "Positive" || prediction === 1;

  // Correctly map the prediction to the speedometer value
  const speedometerValue = isPositive ? 100 : 0; // 100 for positive, 0 for negative

  console.log("Prediction:", prediction);
  console.log("Is Positive:", isPositive);
  console.log("Speedometer Value:", speedometerValue);

  // Select the gif image based on the speedometer value or prediction
  const riskGif = isPositive
    ? require("../../../assets/negative.gif") // Path to high-risk gif
    : require("../../../assets/positive.gif"); // Path to low-risk gif

  const predictionText = isPositive
    ? "There Is a Risk Of Eye Blindness."
    : "No Risk Of Eye Blindness";
  const predictionTextColor = isPositive ? "red" : "green";
  return (
    <>
    
      <RetinopathyResultHomeScreenTopAppBar header={"Review Summary"} />

      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.predictionSection}>
              {/* Display the appropriate gif based on the prediction */}
              <Image source={riskGif} style={styles.gifImage} />

              {/* Display the prediction message */}
              <Text
                style={[styles.predictionText, { color: predictionTextColor }]}
              >
                {predictionText}
              </Text>
            </View>

            <Text style={styles.predictionText}>Summary</Text>
            <View style={styles.hr} />

            <View style={styles.pricingSection}>
              {responseData && (
                <View style={styles.responseDataContainer}>
                  {Object.entries(responseData).map(([key, value]) => (
                    <View
                      key={key}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <Text style={styles.pricingText}>{key}:</Text>
                      <Text style={styles.price}>
                        {Array.isArray(value) ? value[0] : value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.hr} />
            </View>

            {isPositive ? (
              <View style={styles.paymentSection}>
                <View style={styles.paymentIconSection}>
                  <FontAwesome name="map-signs" size={18} color="#007bff" />
                  <Text style={styles.paymentText}>Locations</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Locations")}
                >
                  <Text style={styles.changeText}>View Nearest Clinical</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.paymentSection}>
                <View style={styles.paymentIconSection}>
                  <FontAwesome name="fort-awesome" size={18} color="#007bff" />
                  <Text style={styles.paymentText}>HealthTips</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("HealthTips")}
                >
                  <Text style={styles.changeText}>View Health Tips</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.paymentSection}>
              <View style={styles.paymentIconSection}>
                <FontAwesome name="forward" size={18} color="#007bff" />
                <Text style={styles.paymentText}>Next screen</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("NextScreeningInterval")}
              >
                <Text style={styles.changeText}>View Next Screening</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
