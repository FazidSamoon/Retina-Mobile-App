import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MenuIcon from "../../../assets/MenuIcon";
import BackwardArrow from "../../../assets/BackwardArrow";
import { useNavigation } from "@react-navigation/native";
import BackArrowHead from "../../../assets/BackArrowHead";
import Retinopathy from "../Retinopathy/Retinopathy";

const ClinicalTrailHome = ({
  header = "Check Vision Task",
  navigateTo,
}: {
  header: string;
  navigateTo?: () => void;
}) => {
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    if (navigateTo) {
      navigation.navigate('Survay');
    } else {
      navigation.navigate('Survay');
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",

        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity style={styles.menuContainer} onPress={handleNavigation}>
        <BackArrowHead />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#002055",
        }}
      >
        {header}
      </Text>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          paddingVertical: 65,
        }}
      ></TouchableOpacity>
    </View>
  );
};

export default ClinicalTrailHome;

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 25,
    borderColor: "#E9F1FF",

    borderWidth: 1,
  },
});
