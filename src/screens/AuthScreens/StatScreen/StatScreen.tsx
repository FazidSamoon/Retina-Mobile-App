import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import VisionStatsContainer from "../../../components/organisms/VisionStatsContainer/VisionStatsContainer";
import { useNavigation } from "@react-navigation/native";

const StatScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Vision Stats"} />
      <TouchableOpacity style={[styles.card]} onPress={() => {
        navigation.navigate("LongDistanceStat");
      }}>
        <Text style={styles.heading}>Long distance test stats</Text>
        <Text style={styles.description}>
          Statistical overview of long distane vision test performances
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card]} onPress={() => {
        navigation.navigate("ShortDistanceStat");
      }}>
        <Text style={styles.heading}>Near distance test stats</Text>
        <Text style={styles.description}>
          Statistical overview of near distane vision test performances
        </Text>
      </TouchableOpacity>
      {/* <VisionStatsContainer /> */}
    </View>
  );
};

export default StatScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  card: {
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
