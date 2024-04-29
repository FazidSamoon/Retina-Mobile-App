import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const QuickSetupStepTwo = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const onNextButtonPressed = () => {
    setStep(3);
  };

    const [date, setDate] = React.useState(new Date());
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Tell Us About Yourelf!
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#9B9B9B",
            maxWidth: 300,
          }}
        >
          To give you a better experience we need to know your gender
        </Text>
      </View>

      <View>
      <RNDateTimePicker value={new Date()} />
      </View>

      <View>
        <RPPrimaryButton
          buttonTitle={"Next"}
          //   disabled={!selected}
          onPress={onNextButtonPressed}
          buttonStyle={{
            borderRadius: 30,
            // borderColor: selected ? BASIC_COLORS.PRIMARY : "#E6E6E6" ,
          }}
        />
      </View>
    </View>
  );
};

export default QuickSetupStepTwo;

const styles = StyleSheet.create({});
