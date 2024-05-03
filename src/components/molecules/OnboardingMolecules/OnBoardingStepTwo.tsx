import { View, Text, Image } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import OnboardingImage from "../../../../assets/onboardingTwo.png";

const OnBoardingStepTwo = () => {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {/* <OnboardingImageOne /> */}
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image source={OnboardingImage} />
      </View>

      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 34,
            textAlign: "center",
          }}
        >
          Care Your{" "}
          <Text
            style={{
              color: BASIC_COLORS.PRIMARY,
            }}
          >
            Eyes
          </Text>
        </Text>

        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            marginTop: 20,
            lineHeight: 24,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingStepTwo;
