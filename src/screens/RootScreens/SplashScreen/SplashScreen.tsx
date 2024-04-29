import React from "react";
import { Text, View } from "react-native";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import { ButtonType } from "../../../components/atoms/RPPrimaryButton/buttonTypes";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const handleButtonPress = () => {
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        backgroundColor: BASIC_COLORS.BACKGROUND,
        height: "100%",
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: BASIC_COLORS.PRIMARY,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
        }}
      ></View>
      <View
        style={{
          height: 200,
          width: 200,
          borderRadius: 100,
          backgroundColor: BASIC_COLORS.WHITE,
          elevation: 5,
          position: "absolute",
          top: "35%",
        }}
      ></View>

      <View
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-end",
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: BASIC_COLORS.FONT_PRIMARY,
              fontWeight: "bold",
            }}
          >
            Welcome to React Native
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: BASIC_COLORS.FONT_SECONDARY,
              marginTop: 10,
            }}
          >
            Hello world
          </Text>
        </View>
        <View>
          <RPPrimaryButton
            buttonTitle={"Get Started"}
            buttonType={ButtonType.PRIMARY}
            onPress={handleButtonPress}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
