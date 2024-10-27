import { StyleSheet } from "react-native";

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
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginTop: 20,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  lineStyles: {
    width: 180,
    backgroundColor: "red",
    borderWidth: 1,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
