import { StyleSheet } from "react-native";

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
    color: "#A6CE39",
    fontSize: 16,
    fontWeight: "bold",
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
    height: 55,
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

export default styles;
