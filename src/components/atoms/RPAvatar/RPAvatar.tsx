import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import React from "react";

const RPAvatar = ({
    uri = null,
    size = "small",
    rounded = true,
    activeOpacity = 0.7,
    containerStyle,
    titleStyle,
    title = "RP",
}: {
    uri: string;
    size: "small" | "medium" | "large" | "xlarge";
    rounded?: boolean;
    activeOpacity?: number;
    containerStyle?: object;
    titleStyle?: object;
    title: string;
}) => {
  return (
    <Avatar
      rounded = {rounded}
      source={uri ? { uri: uri } : null}
      title={title}
      size={size}
      activeOpacity={activeOpacity}
      containerStyle={{
        backgroundColor: "white",
        ...containerStyle
      }}
      titleStyle={{
        color: "black",
        ...titleStyle
      }}
    />
  );
};

export default RPAvatar;

const styles = StyleSheet.create({});
