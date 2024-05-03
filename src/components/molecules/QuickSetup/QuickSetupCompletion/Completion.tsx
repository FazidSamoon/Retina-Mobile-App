import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, CSSProperties, useEffect } from "react";
import { QuickSetupTypes } from "../../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";
import BackwardArrow from "../../../../assets/BackwardArrow";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import { RPSInputFieldStyle } from "../../../atoms/RPInputField/inputFieldTypes";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import CompletionIcon from "../../../../assets/CompletionIcon";
import { Circle } from "react-native-animated-spinkit";
import { useNavigation } from "@react-navigation/native";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Completion = ({
  setQuickSetupState,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
}) => {
  const navigation = useNavigation<any>();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const phoneInput = useRef<PhoneInput>(null);
  const onBackButtonPressed = () => {
    setQuickSetupState(QuickSetupTypes.CREATE_ACCOUNT);
  };

  const onNextButtonPressed = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
    // setQuickSetupState(QuickSetupTypes.QUISTIONAIRE);
  };

  useEffect(() => {
    setTimeout(() => {
      if (showModal) navigation.navigate("Login");
    }, 5000);
  }, [showModal])

  return (
    <SafeAreaView style={styles.container}>
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
            height: 46,
            width: 46,
          }}
        ></View>
      </View>

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
            Complete Your Profile
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#9B9B9B",
              maxWidth: 300,
            }}
          >
            Don’t worry, only you can see your personal data. No one else will
            be able to see it.
          </Text>
        </View>

        <View
          style={{
            gap: 20,
          }}
        >
          <RPInputField
            inputLabel={"Name"}
            inputPlaceholder={"Enter your full name"}
            onChangeText={undefined}
            value={""}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
          />

          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                color: BASIC_COLORS.FONT_PRIMARY,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Phone Number
            </Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="SL"
              layout="second"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              containerStyle={{
                backgroundColor: "#F4F6F9",
                borderRadius: 10,
                height: 40,
                width: "100%",
              }}
              codeTextStyle={{ color: "#9B9B9B" }}
              textInputStyle={{
                color: "#9B9B9B",
                padding: 0,
                margin: 0,
                height: 40,
              }}
              textContainerStyle={{ padding: 0, margin: 0 }}
              autoFocus
            />
          </View>

          <RPInputField
            inputLabel={"Location"}
            inputPlaceholder={"Enter your location"}
            onChangeText={undefined}
            value={""}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
          />

          <RPInputField
            inputLabel={"Occupation"}
            inputPlaceholder={"Enter your occupation"}
            onChangeText={undefined}
            value={""}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
          />
        </View>

        <View>
          <RPPrimaryButton
            buttonTitle={"Complete Profile"}
            //   disabled={!selected}
            onPress={onNextButtonPressed}
            buttonStyle={{
              borderRadius: 30,
              // borderColor: selected ? BASIC_COLORS.PRIMARY : "#E6E6E6" ,
            }}
          />
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              height: "60%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CompletionIcon />
            <View style={{
              marginTop: 20,
              gap: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Congratulations!
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14.5,
                  fontWeight: "medium",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                Your account is ready to use. You will be redirected to the Home
                page in a few seconds.
              </Text>
            </View>

            <Circle size={90} color="#109BE7" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Completion;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});
