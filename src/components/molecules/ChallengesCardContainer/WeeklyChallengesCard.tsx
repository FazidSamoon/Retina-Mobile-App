import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RPAvatar from "../../atoms/RPAvatar/RPAvatar";
import RPAvatarGroup from "../../atoms/RPAvatarGroup/RPAvatarGroup";
import { dummyAvatar } from "../../atoms/RPAvatarGroup/RPAvatarGroupTypes";
import { LinearProgress } from "@rneui/base";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const WeeklyChallengesCard = () => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        // alert("Weekly Challenges Card Pressed");
      }}
    >
      <LinearGradient
        colors={["#109BE7", "#3A7AF6"]}
        style={{
          width: 300,
          height: 172,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Weekly Challenge
        </Text>
        <Text
          style={{
            color: "#C5DAFD",
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Complete your remaining weekly challenges
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <RPAvatarGroup avatars={dummyAvatar} size={"small"} max={3} />

          <View
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "white", fontSize: 14 }}>Progress</Text>

              <Text style={{ color: "white", fontSize: 14, fontWeight: "900" }}>
                2/10
              </Text>
            </View>
            <LinearProgress
              value={2 / 10}
              color={BASIC_COLORS.WHITE}
              style={{
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default WeeklyChallengesCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 172,
    borderRadius: 20,
    backgroundColor: "red",
    gap: 20,
    marginRight: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    shadowColor: "#000",
  },
});
