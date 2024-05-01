import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { LinearProgress } from "react-native-elements";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPAvatarGroup from "../../atoms/RPAvatarGroup/RPAvatarGroup";
import { dummyAvatar } from "../../atoms/RPAvatarGroup/RPAvatarGroupTypes";

const MonthlyChallengesCard = () => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        // alert("Weekly Challenges Card Pressed");
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Monthly Challenge
      </Text>
      <Text
        style={{
          color: "#C5DAFD",
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        Complete your remaining monthly challenges
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
            <Text style={{ color: BASIC_COLORS.PRIMARY, fontSize: 14 }}>Progress</Text>

            <Text style={{ color: BASIC_COLORS.PRIMARY, fontSize: 14, fontWeight: "900" }}>
              2/10
            </Text>
          </View>
          <LinearProgress
            value={2 / 10}
            color={BASIC_COLORS.PRIMARY}
            style={{
              height: 10,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MonthlyChallengesCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 172,
    borderRadius: 20,
    borderColor: "#E9F1FF",
    borderWidth: 3,
    elevation: -1,
    marginRight: 10,
    padding: 20,
  },
});
