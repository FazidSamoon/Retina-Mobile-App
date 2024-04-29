import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { QuickSetupTypes } from "./quickSetupTypes";
import CreateAccount from "../../../components/molecules/QuickSetup/QuickSetupRegistration/CreateAccount";
import Questionair from "../../../components/molecules/QuickSetup/Questionair";
import Completion from "../../../components/molecules/QuickSetup/QuickSetupCompletion/Completion";

const QuickSetupScreen = () => {
  const [quickSetupState, setQuickSetupState] = useState<QuickSetupTypes>(
    QuickSetupTypes.CREATE_ACCOUNT
  );
  return (
    <View>
      {quickSetupState === QuickSetupTypes.CREATE_ACCOUNT && <CreateAccount setQuickSetupState={setQuickSetupState}/>}
      {quickSetupState === QuickSetupTypes.QUISTIONAIRE && <Questionair setQuickSetupState={setQuickSetupState}/>}
      {quickSetupState === QuickSetupTypes.COMPLETION && <Completion setQuickSetupState={setQuickSetupState}/>}
    </View>
  );
};

export default QuickSetupScreen;

const styles = StyleSheet.create({});
