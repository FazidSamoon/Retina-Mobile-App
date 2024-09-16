import React from "react";
import { Text, View } from "react-native";
import RPDrawer from "../../components/atoms/RPDrawer/RPDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/AuthScreens/HomeScreen/HomeScreen";
import VisionTestHomeScreen from "../../screens/AuthScreens/VisionTestHomeScreen/VisionTestHomeScreen";
import EyeExerciseHome from "../../screens/AuthScreens/EyeExerciseHome/EyeExerciseHome";
import LongDistanceVisionTestScreen from "../../screens/AuthScreens/LongDistanceVisionTestScreen/LongDistanceVisionTestScreen";
import TestHomeScreen from "../../screens/RetinopathyScreens/Diabatic/Diabatic";
import Diabatic from "../../screens/RetinopathyScreens/Diabatic/Diabatic";
import Retinopathy from "../../screens/RetinopathyScreens/Retinopathy/Retinopathy";
import HealthTips from "../../screens/RetinopathyScreens/AfterPrediction/HealthTips";
import RetinClinicLoc from "../../screens/RetinopathyScreens/RetinopathyMaps/RetinClinicLoc";
import DiabaticResult from "../../screens/RetinopathyScreens/Diabatic/DiabaticResult";
import RetinopathyResult from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyResult";
import NextScreeningInterval from "../../screens/RetinopathyScreens/AfterPrediction/NextScreeningPositive";

const DrawerNav = createDrawerNavigator<any>();

interface DrawerProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}

const index = () => {
  const MemoizedDrawer = React.useCallback(
    ({ navigation }: DrawerProp) => <RPDrawer navigation={navigation} />,
    []
  );
  return (
    <>
      <DrawerNav.Navigator
        initialRouteName={"Home"}
        drawerContent={({ navigation }) => (
          <MemoizedDrawer navigation={navigation} />
        )}
        screenOptions={{
          headerShown: false,
          drawerType: "front",
        }}
      >
        <DrawerNav.Screen name="Home" component={HomeScreen} />
        <DrawerNav.Screen name="VisionTestHome" component={VisionTestHomeScreen} />
        <DrawerNav.Screen name="EyeExercisiseHome" component={EyeExerciseHome} />
        <DrawerNav.Screen name="LongDistanceVisionTest" component={LongDistanceVisionTestScreen} />




        <DrawerNav.Screen name="Diabatic" component={Diabatic} />
        <DrawerNav.Screen name="ResultScreen" component={DiabaticResult} />
        <DrawerNav.Screen name="Retinopathy" component={Retinopathy} />
        <DrawerNav.Screen name="HealthTips" component={HealthTips} />
        <DrawerNav.Screen name="RetinClinicLoc" component={RetinClinicLoc} />
        <DrawerNav.Screen name="RetinopathyResult" component={RetinopathyResult} />


        
        <DrawerNav.Screen name="NextScreening" component={NextScreeningInterval} />
      






      </DrawerNav.Navigator>
    </>
  );
};

export default index;
