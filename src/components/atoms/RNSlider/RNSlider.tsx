import React from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Text, Icon } from "@rneui/themed";
import { BASIC_COLORS } from "../../../utils/constants/styles";

type RNSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  showValue?: boolean;
};

const RNSlider = ({
  value,
  onValueChange,
  showValue = false,
}: RNSliderProps) => {
  return (
    <>
      <View style={[styles.contentView]}>
        <Slider
          value={value}
          onValueChange={onValueChange}
          maximumValue={1}
          minimumValue={0}
          step={0.1}
          allowTouchTrack
          maximumTrackTintColor={BASIC_COLORS.LIGHT_GRAY}
          minimumTrackTintColor={BASIC_COLORS.PRIMARY}
          trackStyle={{ height: 6, backgroundColor: "black" }}
          thumbStyle={{
            height: 20,
            width: 20,
            backgroundColor: "black",
          }}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={14}
                reverse
                containerStyle={{ bottom: 14, right: 14 }}
                color={BASIC_COLORS.PRIMARY}
              />
            ),
          }}
        />

        {showValue && <Text style={{ paddingTop: 20 }}>Value: {value}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default RNSlider;
