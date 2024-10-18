import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ScrollView, // Import ScrollView
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { translations } from "./translations"; // Adjust the path as necessary

const InsulinComponent = () => {
  const [language, setLanguage] = useState("en");
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: modalVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setDropdownVisible(false);
  };

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <FontAwesome name="question-circle" size={18} color="#D3D3D3" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {translations[language].insulin.title}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-circle" size={28} color="#FF5252" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.infoContainer}>
              <Ionicons
                name="water-outline"
                size={50}
                color="#4CAF50"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                {translations[language].insulin.info}
              </Text>
            </View>

            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>
                {translations[language].insulin.stepsTitle}{" "}
                {/* Use translation for stepsTitle */}
              </Text>
              {translations[language].insulin.steps.map((step, index) => (
                <Text key={index} style={styles.stepText}>
                  {`${index + 1}. ${step}`}
                </Text>
              ))}
            </View>
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>
                {translations[language].insulin.report}{" "}
                {/* Use translation for stepsTitle */}
              </Text>
            </View>

            <View style={styles.reportDetailsContainer}>
              <Text style={styles.reportDetailsText}>
                {translations[language].insulin.report}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}
              activeOpacity={0.7}
            >
              <Ionicons name="language" size={26} color="#676767" />
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("en")}
                >
                  <Text style={styles.dropdownItemText}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("si")}
                >
                  <Text style={styles.dropdownItemText}>සිං</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("ta")}
                >
                  <Text style={styles.dropdownItemText}>தமிழ்</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000AA",
  },
  modalContent: {
    position: "absolute",
    top: "10%",
    left: "5%",
    right: "5%",
    bottom: "10%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  closeButton: {
    marginLeft: 10,
  },
  scrollContainer: {
    maxHeight: "80%", // Limit the height to allow scrolling
  },
  infoContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  infoIcon: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555555",
    textAlign: "justify",
  },
  stepsContainer: {
    marginTop: 20,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    lineHeight: 20,
  },
  reportDetailsContainer: {
    marginTop: 15,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  reportDetailsText: {
    fontSize: 14,
    color: "#333",
  },
  iconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  dropdown: {
    position: "absolute",
    top: -80,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 5,
    width: 60,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default InsulinComponent;
