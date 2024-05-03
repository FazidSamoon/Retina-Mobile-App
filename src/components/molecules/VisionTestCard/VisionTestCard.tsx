import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const VisionTestCard = ({
  title,
  description,
  onTapLink,
  active,
}: {
  title: string;
  description: string;
  onTapLink: string;
  active?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const onPress = () => {
    if (active) navigation.navigate(onTapLink);
  };
  return (
    <TouchableOpacity
      disabled={!active}
      style={[
        styles.container,
        {
          backgroundColor: active ? "white" : "#E9F1FF",
          borderColor: active ? "#E9F1FF" : "#002055",
          borderWidth: active ? 1 : 2,
          elevation: active ? 5 : 0,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

export default VisionTestCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: 91,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#848A94",
  },
});
