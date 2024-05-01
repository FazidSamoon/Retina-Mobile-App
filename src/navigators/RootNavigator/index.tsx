import React from "react";
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "../AuthNavigator";
import RegistrationScreen from "../../screens/RootScreens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../../screens/RootScreens/LoginScreen/LoginScreen";
import QuickSetupScreen from "../../screens/RootScreens/QuickSetupScreen/QuickSetupScreen";
import SplashScreen from "../../screens/RootScreens/SplashScreen/SplashScreen";
import OnboardingScreen from "../../screens/RootScreens/OnboardingScreen/OnboardingScreen";

// const StackNav = createStackNavigator<RootScreensParamsList>();
const StackNav = createStackNavigator();

const index = () => {
  const isAuthenticated = true;
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <StackNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <StackNav.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <StackNav.Screen name="Splash" component={SplashScreen} />
            <StackNav.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <StackNav.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
            <StackNav.Screen name="QuickSetup" component={QuickSetupScreen} options={{ headerShown: false }} />
            
            <StackNav.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
            {/* <StackNav.Screen
              name="CompleteRegistration"
              component={ResetPwSuccess}
            /> */}
          </>
        )}
      </StackNav.Navigator>
    </>
  );
};

export default index;
