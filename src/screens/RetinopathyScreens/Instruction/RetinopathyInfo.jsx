import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import DiabaticResult from "../Diabatic/DiabaticResult";

export default function RetinopathyInfo({ navigation }) {
  return (
    <>
      <RetinopathyHomeScreenTopAppBar header={"RetinopathyInfo"} />

      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.header}>RetinopathyInfo</Text>
          <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Tip Card 1 */}
        <View style={styles.tipCard}>
          <View style={[styles.tipCardContent, { backgroundColor: "#d9a4f4" }]}>
            <Image
              source={require("../../../assets/2.gif")} // Replace with your GIF path or URL
              style={styles.gifImage}
            />
            <Text style={styles.tipTitle}>Check Vision Task</Text>
            <Text style={styles.tipDescription}>
              Regular eye check-ups are crucial for early detection of
              retinopathy. Make sure to schedule periodic vision tests to avoid
              complications.
            </Text>
            <TouchableOpacity style={styles.learnMoreBtn}>
              <Text style={styles.learnMoreText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tip Card 2 */}
        <View style={styles.tipCard}>
          <View style={[styles.tipCardContent, { backgroundColor: "#8cd4f5" }]}>
            <Image
              source={require("../../../assets/2.gif")} // Replace with your GIF path or URL
              style={styles.gifImage}
            />
            <Text style={styles.tipTitle}>Eye Exercise</Text>
            <Text style={styles.tipDescription}>
              Engage in simple eye exercises daily to improve blood flow to the
              eyes and maintain eye health. This can reduce strain and support
              better vision.
            </Text>
            <TouchableOpacity style={styles.learnMoreBtn}>
              <Text style={styles.learnMoreText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tip Card 3 */}
        <View style={styles.tipCard}>
          <View style={[styles.tipCardContent, { backgroundColor: "#f5b48c" }]}>
            <Image
              source={require("../../../assets/2.gif")} // Replace with your GIF path or URL
              style={styles.gifImage}
            />
            <Text style={styles.tipTitle}>Healthy Foods</Text>
            <Text style={styles.tipDescription}>
              Incorporating foods rich in vitamins A, C, and E, as well as
              omega-3 fatty acids, can help protect your eyes from damage caused
              by diabetes.
            </Text>
            <TouchableOpacity style={styles.bookNowBtn}>
              <Text style={styles.bookNowText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add more tips as needed */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllBtn: {
    padding: 8,
  },
  seeAllText: {
    color: "#109BE7",
    fontSize: 16,
    fontWeight: "600",
  },
  tipCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tipCardContent: {
    padding: 16,
    borderRadius: 10,
  },
  gifImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d2d2d",
    marginBottom: 10,
  },
  tipDescription: {
    fontSize: 15,
    color: "#555",
    marginBottom: 16,
  },
  learnMoreBtn: {
    backgroundColor: "#4a4a4a",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  learnMoreText: {
    color: "#fff",
    fontSize: 14,
  },
  bookNowBtn: {
    backgroundColor: "#109BE7",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  bookNowText: {
    color: "#fff",
    fontSize: 14,
  },
});
