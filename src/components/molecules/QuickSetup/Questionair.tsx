import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { QuickSetupTypes } from "../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";
import BackwardArrow from "../../../assets/BackwardArrow";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { LinearProgress } from "@rneui/themed";
import QuickSetupStepOne from "./QuickSetupStepOne/QuickSetupStepOne";
import QuickSetupStepTwo from "./QuickSetupStepTwo/QuickSetupStepTwo";
import QuickSetupStepThree from "./QuickSetupStepThree/QuickSetupStepThree";
import QuickSetupStepFour from "./QuickSetupStepFour/QuickSetupStepFour";
import { RegisterUserRequest } from "../../../utils/types/commonTypes";

const Questionair = ({
  setQuickSetupState,
  setRegistrationData,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegisterUserRequest>
  >;
}) => {
  const [step, setStep] = useState<number>(1);
  const onBackButtonPressed = () => {
    setQuickSetupState(QuickSetupTypes.CREATE_ACCOUNT);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={onBackButtonPressed}
          style={{
            backgroundColor: BASIC_COLORS.WHITE,
            height: 46,
            width: 46,
            borderRadius: 27,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#E6E6E6",
            borderWidth: 1,
          }}
        >
          <BackwardArrow fill="black" />
        </Pressable>

        <View
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <LinearProgress
            value={step / 3}
            trackColor="#F4F6F9"
            color={BASIC_COLORS.PRIMARY}
            style={{
              height: 10,
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text>
            <Text style={{ color: BASIC_COLORS.PRIMARY }}>{step}/3</Text>
          </Text>
        </View>

        <View
          style={{
            height: 46,
            width: 46,
          }}
        ></View>
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        {step === 1 ? (
          <QuickSetupStepOne
            setStep={setStep}
            setRegistrationData={setRegistrationData}
          />
        ) : step === 2 ? (
          <QuickSetupStepThree setStep={setStep} 
          setRegistrationData={setRegistrationData}
          />
        ) : step === 4 ? (
          <QuickSetupStepFour
            setStep={setStep}
            setQuickSetupState={setQuickSetupState}
            setRegistrationData={setRegistrationData}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Questionair;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: Dimensions.get("window").height - 50,
  },
});
