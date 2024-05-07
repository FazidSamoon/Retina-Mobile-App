import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
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
import { RegisterUserRequest } from "../../../../utils/types/commonTypes";
import { useFormik } from "formik";
import { completionValidationSchema } from "../../../../utils/validations";
import { ScrollView } from "react-native-gesture-handler";
import { registerUser } from "../../../../api/auth";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Completion = ({
  setQuickSetupState,
  setRegistrationData,
  registrationData,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegisterUserRequest>
  >;
  registrationData: RegisterUserRequest;
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

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");

  const initialValues: {
    name: string;
    phoneNumber: string;
    location: string;
    occupation: string;
  } = {
    name: "",
    phoneNumber: "",
    location: "",
    occupation: "",
  };

  const onSubmit = async (values: any) => {
    setRegistrationData((prev) => ({
      ...prev,
      phone: values.phoneNumber,
      location: values.location,
      occupation: values.occupation,
    }));

    const { apiSuccess, apiError }: any = await registerUser(registrationData);
    if (apiSuccess) {
      setShowModal(true);
    } else {
      showToastWithGravityAndOffset(apiError);
    }
  };

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const handleFormSubmit = async () => {
    console.log("sss", registrationData);
    setRegistrationData((prev) => ({
      ...prev,
      phone: formattedValue,
      location: location,
      occupation: occupation,
    }));
    const { apiSuccess, apiError }: any = await registerUser({
      ...registrationData,
      phone: formattedValue,
      location: location,
      occupation: occupation,
    });
    console.log("sss success", registrationData);
    console.log("sss error", apiError);
    if (apiSuccess) {
      setShowModal(true);
    } else {
      showToastWithGravityAndOffset(apiError);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: completionValidationSchema,
    validateOnChange: true,
  });

  const { values, errors, handleSubmit } = formik;

  useEffect(() => {
    setTimeout(() => {
      if (showModal) navigation.navigate("Login");
    }, 5000);
  }, [showModal]);

  const isButtonDisabled = () => {
    return Object.keys(errors).length > 0;
  };
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

        <ScrollView
          style={{
            gap: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              marginTop: 15,
            }}
          >
            <RPInputField
              inputLabel={"Name"}
              inputPlaceholder={"Enter your full name"}
              onChangeText={(e) => {
                setName(e);
                formik.setFieldValue("name", e);
              }}
              value={values.name}
              inputStyle={RPSInputFieldStyle.OUTLINED}
              inputContainerStyle={{
                backgroundColor: "#F4F6F9",
              }}
              error={formik.errors.name ? true : false}
              errorMessage={formik.errors.name as string}
            />
          </View>

          <View
            style={{
              gap: 5,
              marginTop: 15,
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
              defaultValue={values.phoneNumber}
              defaultCode="SL"
              layout="second"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                formik.setFieldValue("phoneNumber", text);
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

          <View
            style={{
              marginTop: 15,
            }}
          >
            <RPInputField
              inputLabel={"Location"}
              inputPlaceholder={"Enter your location"}
              onChangeText={(e) => {
                setLocation(e);
                formik.setFieldValue("location", e);
              }}
              value={values.location}
              inputStyle={RPSInputFieldStyle.OUTLINED}
              inputContainerStyle={{
                backgroundColor: "#F4F6F9",
              }}
              error={formik.errors.location ? true : false}
              errorMessage={formik.errors.location as string}
            />
          </View>

          <View
            style={{
              marginTop: 15,
            }}
          >
            <RPInputField
              inputLabel={"Occupation"}
              inputPlaceholder={"Enter your occupation"}
              onChangeText={(e) => {
                setOccupation(e);
                formik.setFieldValue("occupation", e);
              }}
              value={values.occupation}
              inputStyle={RPSInputFieldStyle.OUTLINED}
              inputContainerStyle={{
                backgroundColor: "#F4F6F9",
              }}
              error={formik.errors.occupation ? true : false}
              errorMessage={formik.errors.occupation as string}
            />
          </View>
        </ScrollView>

        <View>
          <RPPrimaryButton
            buttonTitle={"Complete Profile"}
            disabled={isButtonDisabled()}
            onPress={handleFormSubmit}
            buttonStyle={{
              borderRadius: 30,
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
            <View
              style={{
                marginTop: 20,
                gap: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
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
                  fontWeight: "500",
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
    height: Dimensions.get("window").height - 50,
  },
});
