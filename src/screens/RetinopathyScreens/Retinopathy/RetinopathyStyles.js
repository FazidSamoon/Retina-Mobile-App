import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    borderColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  imagePicker: {
    width: "85%",
    height: 145,
    borderRadius: 15,
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

  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  predictionContainer: {
    marginTop: 20,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 20,
    alignItems: "center",
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    color: "#ff6347",
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  extractedTextContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  extractedTextLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  extractedText: {
    fontSize: 16,
    color: "#333",
  },
  transparentButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,

    marginBottom: 15,
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
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "90%",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stepImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

  // Styles for ReviewSummary component

  reviewSummaryContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  verifiedSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconVerified: {
    marginLeft: 5,
  },
  specialization: {
    fontSize: 16,
    color: "#777",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  pricingSection: {
    marginBottom: 20,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pricingText: {
    fontSize: 16,
    color: "#555",
  },
  price: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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

export default styles;
