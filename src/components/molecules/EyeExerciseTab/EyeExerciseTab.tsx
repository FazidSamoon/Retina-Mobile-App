import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { EyeExerciseType } from "../../organisms/EyeExerciseContainer/EyeExerciseContainer";

const EyeExerciseTab = ({ title, description, imgSrc }: EyeExerciseType) => {
  return (
    <View
      style={{
        width: "100%",
        height: 120,
        borderColor: BASIC_COLORS.PRIMARY,
        borderWidth: 1,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",

        marginVertical: 10,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          maxWidth: "70%",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "black",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "black",
            marginTop: 10,
            lineHeight: 20,
          }}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E9F1FF",
          borderTopEndRadius: 20,
          borderBottomEndRadius: 20,
        }}
      >
        <Image
          source={imgSrc}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    </View>
  );
};

export default EyeExerciseTab;

const styles = StyleSheet.create({});
