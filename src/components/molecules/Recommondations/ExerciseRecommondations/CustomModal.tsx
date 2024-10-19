import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CustomModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  children,
  onClose,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerContent}>
              <Text style={styles.modalHeader}>{title}</Text>
              <AntDesign
                name="close"
                size={20}
                color="black"
                style={styles.closeButton}
                onPress={onClose}
              />
            </View>
            {/* Render the children elements passed into the modal */}
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    height: "auto",
    alignItems: "center",
  },
  modalContent: {
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
    position: "relative",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
