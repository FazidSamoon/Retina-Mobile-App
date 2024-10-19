import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Defs, Path, Rect, Svg } from "react-native-svg";

const TaskIcon = () => {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_854_2795)">
        <Path
          d="M12 20.2356H24M12 12.2356H24M12 4.2356H24M1 19.2356L4 22.2356L9 17.2356M1 11.2356L4 14.2356L9 9.2356M9 1.2356L4 6.2356L1 3.2356"
          stroke="#6FCCFF"
          stroke-width="2"
        />
      </g>
      <Defs>
        <clipPath id="clip0_854_2795">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.235596)"
          />
        </clipPath>
      </Defs>
    </Svg>
  );
};

export default TaskIcon;

const styles = StyleSheet.create({});
