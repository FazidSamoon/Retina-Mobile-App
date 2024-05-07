import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import { QuickSetupTypes } from "../../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";
import { RegisterUserRequest } from "../../../../utils/types/commonTypes";

const eyeDecieseOptions = [
  "Age-Related Macular Degeneration",
  "Diabetic Retinopathy",
  "Amblyopia",
  "Glaucoma",
  "Strabismus",
  "Refractive Errors",
];
const QuickSetupStepFour = ({
  setStep,
  setQuickSetupState,
  setRegistrationData
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegisterUserRequest>
  >;
}) => {
  const [selected, setSelected] = useState(null);
  const onNextButtonPressed = () => {
    setRegistrationData((prev) => ({
      ...prev,
      eyeDisease: selected,
    }));
    setQuickSetupState(QuickSetupTypes.COMPLETION);
  };
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
          What's Your Eye Disease?
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#9B9B9B",
            maxWidth: 300,
          }}
        >
          This helps us create your personalized plan
        </Text>
      </View>

      <View>
        {eyeDecieseOptions.map((option, index) => (
          <Pressable
            onPress={() => setSelected(option)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              padding: 10,
              margin: 5,
              borderRadius: 10,
              height: 55,
              borderColor:
                selected === option ? BASIC_COLORS.PRIMARY : "#E6E6E6",
              borderWidth: 1,
            }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 10,
                borderColor:
                  selected === option ? BASIC_COLORS.PRIMARY : "#E6E6E6",
                borderWidth: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 8,
                  backgroundColor:
                    selected === option ? BASIC_COLORS.PRIMARY : "white",
                }}
              />
            </View>
            <Text>{option}</Text>
          </Pressable>
        ))}
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

export default QuickSetupStepFour;

const styles = StyleSheet.create({});
