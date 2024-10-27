import { View, Modal, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Circle } from "react-native-animated-spinkit";
import CompletionIcon from "../../../assets/CompletionIcon";
import styles from "./styles";

// LoadingAnimation Component
const LoadingAnimation = ({ loading, showModal }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <CompletionIcon />
          <View style={styles.modalContent}>
            <Text style={styles.textPrimary}>
              Processing your request and fetching data.
            </Text>
          </View>
          {loading && <Circle size={60} color="#109BE7" animating={true} />}
        </View>
      </View>
    </Modal>
  );
};

// TestLoadingScreen Component
const TestLoadingScreen = () => {
  const [loading, setLoading] = useState(true); // Start loading as true
  const [showModal, setShowModal] = useState(true); // Start showing modal as true

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      setShowModal(false); // Hide modal after loading
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <View style={styles.container}>
      <LoadingAnimation loading={loading} showModal={showModal} />
    </View>
  );
};

export default TestLoadingScreen;
