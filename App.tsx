import React from 'react';
import Navigators from './src/navigators';
import SplashScreen from './src/screens/RootScreens/SplashScreen/SplashScreen';
import OnboardingScreen from './src/screens/RootScreens/OnboardingScreen/OnboardingScreen';
import LoginScreen from './src/screens/RootScreens/LoginScreen/LoginScreen';
import QuickSetupScreen from './src/screens/RootScreens/QuickSetupScreen/QuickSetupScreen';

const App = () => {
  return <Navigators />;
};

export default App;
