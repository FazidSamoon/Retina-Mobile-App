import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import OTPTextView from "react-native-otp-textinput";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";

const OTPVerification = ({
  onOTPVerificationModalButtonPress,
}: {
  onOTPVerificationModalButtonPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Verify Code</Text>
        <Text style={styles.desciptionText}>
          Please enter the code we just sent to email{" "}
          <Text
            style={{
              color: BASIC_COLORS.ERROR,
            }}
          >
            example@mail.com
          </Text>
        </Text>
        <OTPTextView
          handleTextChange={(e) => console.log(e)}
          containerStyle={{
            marginTop: 20,
          }}
          textInputStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "red",
            height: 50,
          }}
          inputCount={4}
          keyboardType="numeric"
          tintColor={BASIC_COLORS.PRIMARY}
        />
        <View style={styles.resendTextContainer}>
            <Text>Didn't receive OTP?</Text>
            <Text style={styles.resendOtpText}>Resend OTP</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <RPPrimaryButton
          buttonTitle={"Verfy"}
          buttonStyle={{
            borderRadius: 30,
          }}
          onPress={onOTPVerificationModalButtonPress}
        />
      </View>
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  desciptionText: {
    fontSize: 16,
    color: BASIC_COLORS.FONT_SECONDARY,
    lineHeight: 24,
    marginTop: 10,
  },
  resendOtpText: {
    fontSize: 12.5,
    lineHeight: 24,
    textDecorationLine: 'underline'
  },
  resendTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  }
});
