import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const NotificationIcon = () => {
  return (
    <Svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.5513 16.1801C14.9797 16.1801 17.4909 15.4837 17.7335 12.6886C17.7335 9.89539 15.9826 10.075 15.9826 6.64786C15.9826 3.97087 13.4453 0.925049 9.5513 0.925049C5.65734 0.925049 3.11998 3.97087 3.11998 6.64786C3.11998 10.075 1.36914 9.89539 1.36914 12.6886C1.61263 15.4943 4.12391 16.1801 9.5513 16.1801Z"
        stroke="#002055"
        stroke-width="1.73269"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.8513 19.0771C10.5382 20.5352 8.48975 20.5525 7.16406 19.0771"
        stroke="#002055"
        stroke-width="1.73269"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({});
