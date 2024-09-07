import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Text, Icon } from "@rneui/themed";
import { BASIC_COLORS } from "../../../utils/constants/styles";

type SlidersComponentProps = {
  showValue?: boolean;
};

const RNSlider = ({ showValue = false }: SlidersComponentProps) => {
  const [value, setValue] = useState(0);

  return (
    <>
      <View style={[styles.contentView]}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={5}
          minimumValue={0}
          step={1}
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
