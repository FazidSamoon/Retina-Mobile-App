import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  predictionSection: {
    marginBottom: 20,
    alignItems: "center", // Align items center
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  gifImage: {
    width: 250, // Adjust size as needed
    height: 250,
    resizeMode: "contain",
    marginTop: 20,
  },
  pricingSection: {
    marginBottom: 20,
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
