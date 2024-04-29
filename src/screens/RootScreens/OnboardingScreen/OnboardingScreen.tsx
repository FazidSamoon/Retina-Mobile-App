import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ForwardArrow from "../../../assets/ForwardArrow";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import BackwardArrow from "../../../assets/BackwardArrow";
import OnboardingStepOne from "../../../components/molecules/OnboardingMolecules/OnboardingStepOne";
import OnBoardingStepTwo from "../../../components/molecules/OnboardingMolecules/OnBoardingStepTwo";
import OnboardingStepThree from "../../../components/molecules/OnboardingMolecules/OnboardingStepThree";

const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(0);
  const onSkip = () => {
    console.log("Skip");
  };

  const onNextButtonPressed = () => {
    if (step < 2) setStep(step + 1);
    else if (step === 2) console.log("Finish");
  };

  const onBackButtonPressed = () => {
    if (step > 0) setStep(step - 1);
  };
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 40,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Pressable onPress={onSkip}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Skip
          </Text>
        </Pressable>
      </View>
      <View style={{
        height: "90%",
        justifyContent: "space-between",
        
      }}>
        <View>
          {step === 0 ? (
            <OnboardingStepOne />
          ) : step === 1 ? (
            <OnBoardingStepTwo />
          ) : (
            <OnboardingStepThree />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={onBackButtonPressed}
            style={{
              borderColor:
                step === 0 ? BASIC_COLORS.WHITE : BASIC_COLORS.PRIMARY,
              borderWidth: 2,
              height: 54,
              width: 54,
              borderRadius: 27,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BackwardArrow
              fill={step === 0 ? BASIC_COLORS.WHITE : BASIC_COLORS.PRIMARY}
            />
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: index === step ? 20 : 10,
                    width: index === step ? 20 : 10,
                    borderRadius: index === step ? 10 : 5,
                    backgroundColor:
                      index === step
                        ? BASIC_COLORS.PRIMARY
                        : BASIC_COLORS.TERTIARY,
                    marginHorizontal: 5,
                  }}
                />
              );
            })}
          </View>
          <Pressable
            onPress={onNextButtonPressed}
            style={{
              backgroundColor: BASIC_COLORS.PRIMARY,
              height: 54,
              width: 54,
              borderRadius: 27,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ForwardArrow />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
