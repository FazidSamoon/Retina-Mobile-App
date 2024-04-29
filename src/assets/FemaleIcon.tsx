import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const FemaleIcon = ({
    fill = "black"
}: {
    fill?: string;
}) => {
  return (
    <View>
      <Svg
        width="38"
        height="57"
        viewBox="0 0 38 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M37.3334 18.6667C37.3334 8.53334 29.1334 0.333344 19.0001 0.333344C8.86675 0.333344 0.666748 8.53334 0.666748 18.6667C0.666748 27.6667 7.13342 35.1 15.6667 36.6667V43.6667H9.00008V50.3333H15.6667V57H22.3334V50.3333H29.0001V43.6667H22.3334V36.6667C30.8667 35.1 37.3334 27.6667 37.3334 18.6667ZM7.33342 18.6667C7.33342 12.2333 12.5667 7.00001 19.0001 7.00001C25.4334 7.00001 30.6667 12.2333 30.6667 18.6667C30.6667 25.1 25.4334 30.3333 19.0001 30.3333C12.5667 30.3333 7.33342 25.1 7.33342 18.6667Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default FemaleIcon;
