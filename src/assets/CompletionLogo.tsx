import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { G, Mask, Path, Rect, Svg } from "react-native-svg";

const CompletionLogo = () => {
  return (
    <Svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="128" height="128" rx="64" fill="#109BE7" />
      <Mask
        id="mask0_645_3533"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="34"
        y="31"
        width="59"
        height="66"
      >
        <Path
          d="M37.625 42.3055L63.5129 34.75L89.375 42.3055V57.7989C89.3748 65.7392 86.8762 73.4781 82.233 79.9193C77.5897 86.3606 71.0374 91.1774 63.5043 93.6875C55.9689 91.1777 49.4144 86.3602 44.7695 79.9176C40.1247 73.475 37.6251 65.7341 37.625 57.7917V42.3055Z"
          fill="white"
          stroke="white"
          stroke-width="5.75"
          stroke-linejoin="round"
        />
        <Path
          d="M50.5625 62.0625L60.625 72.125L77.875 54.875"
          stroke="black"
          stroke-width="5.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Mask>
      <G mask="url(#mask0_645_3533)">
        <Path d="M29 29H98V98H29V29Z" fill="white" />
      </G>
    </Svg>
  );
};

export default CompletionLogo;

const styles = StyleSheet.create({});
