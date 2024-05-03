import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MenuIcon from "../../../assets/MenuIcon";
import {
  getDateMonthAndYear,
  getDayStringOfTheWeek,
} from "../../../utils/common/commonUtil";
import NotificationIcon from "../../../assets/NotificationIcon";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const date = new Date();
  const day = date.getDate();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <MenuIcon />
      </TouchableOpacity>
      <View>
        <Text style={styles.dateText}>{`${getDayStringOfTheWeek(
          date
        )}, ${day}`}</Text>
      </View>
      <TouchableOpacity style={styles.menuContainer}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: "#E9F1FF",
    borderWidth: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#002055",
  },
});
