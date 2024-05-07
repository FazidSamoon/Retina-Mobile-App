import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { QuickSetupTypes } from "./quickSetupTypes";
import CreateAccount from "../../../components/molecules/QuickSetup/QuickSetupRegistration/CreateAccount";
import Questionair from "../../../components/molecules/QuickSetup/Questionair";
import Completion from "../../../components/molecules/QuickSetup/QuickSetupCompletion/Completion";
import { RegisterUserRequest } from "../../../utils/types/commonTypes";

const QuickSetupScreen = () => {
  const [quickSetupState, setQuickSetupState] = useState<QuickSetupTypes>(
    QuickSetupTypes.CREATE_ACCOUNT
  );

  const [registrationData, setRegistrationData] = useState<RegisterUserRequest>(
    {
      username: "",
      email: "",
      password: "",
      name: "",
      gender: "",
      date_of_birth: new Date(),
      phone: "",
      eye_deciease: "",
      location: "",
      occupation: "",
    }
  );
  return (
    <View>
      {quickSetupState === QuickSetupTypes.CREATE_ACCOUNT && (
        <CreateAccount
          setQuickSetupState={setQuickSetupState}
          setRegistrationData={setRegistrationData}
        />
      )}
      {quickSetupState === QuickSetupTypes.QUISTIONAIRE && (
        <Questionair
          setQuickSetupState={setQuickSetupState}
          setRegistrationData={setRegistrationData}
        />
      )}
      {quickSetupState === QuickSetupTypes.COMPLETION && (
        <Completion
          setQuickSetupState={setQuickSetupState}
          setRegistrationData={setRegistrationData}
          registrationData={registrationData}
        />
      )}
    </View>
  );
};

export default QuickSetupScreen;

const styles = StyleSheet.create({});
