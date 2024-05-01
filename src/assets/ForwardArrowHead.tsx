import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { G, Path, Polygon, Svg } from "react-native-svg";

const ForwardArrowHead = ({
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
      enable-background="new 0 0 24 24"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={fill}
    >
      <G>
        <Path d="M0,0h24v24H0V0z" fill="none" />
      </G>
      <G>
        <Polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
      </G>
    </Svg>
  );
};

export default ForwardArrowHead;

const styles = StyleSheet.create({});
