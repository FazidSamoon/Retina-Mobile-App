import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const BackArrowHead = ({
  fill = "black",
  height = 24,
  width = 24,
}: {
  fill?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={fill}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    </Svg>
  );
};

export default BackArrowHead;

const styles = StyleSheet.create({});
