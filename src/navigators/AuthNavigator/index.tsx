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
import DiabaticInfo from "../../screens/RetinopathyScreens/Instruction/DiabaticInfo";
import RetinopathyInfo from "../../screens/RetinopathyScreens/Instruction/RetinopathyInfo";
import DiabetesPedigree from "../../screens/RetinopathyScreens/Instruction/DiabetesPedigree";
import BMICalculator from "../../screens/RetinopathyScreens/Instruction/BMICalculator";
import AvgGlucose from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/AvgGlucose";
import DiabetesType from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/DiabetesType";
import DiagnosisYear from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/DiagnosisYear";
import DiastolicBp from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/DiastolicBp";
import Hba1c from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/Hba1c";
import SystolicBp from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyVariables/SystolicBp";
import GlucoseComponent from "../../screens/RetinopathyScreens/Diabatic/DiabaticVariables/GlucoseComponent";
import BloodPressureComponent from "../../screens/RetinopathyScreens/Diabatic/DiabaticVariables/BloodPressureComponent";
import InsulinComponent from "../../screens/RetinopathyScreens/Diabatic/DiabaticVariables/InsulinComponent";
import SkinThicknessComponent from "../../screens/RetinopathyScreens/Diabatic/DiabaticVariables/SkinThicknessComponent";

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
        <DrawerNav.Screen name="RetinopathyInfo" component={RetinopathyInfo} />
        <DrawerNav.Screen name="DiabetesPedigree" component={DiabetesPedigree} />
        <DrawerNav.Screen name="BMICalculator" component={BMICalculator} />
        <DrawerNav.Screen name="NextScreeningInterval" component={NextScreeningInterval} />


        
        <DrawerNav.Screen name="AvgGlucose" component={AvgGlucose} />
        <DrawerNav.Screen name="DiabetesType" component={DiabetesType} />
        <DrawerNav.Screen name="DiagnosisYear" component={DiagnosisYear} />
        <DrawerNav.Screen name="DiastolicBp" component={DiastolicBp} />
        <DrawerNav.Screen name="Hba1c" component={Hba1c} />
        <DrawerNav.Screen name="SystolicBp" component={SystolicBp} />





        <DrawerNav.Screen name="GlucoseComponent" component={GlucoseComponent} />
        <DrawerNav.Screen name="BloodPressureComponent" component={BloodPressureComponent} />
        <DrawerNav.Screen name="InsulinComponent" component={InsulinComponent} />
        <DrawerNav.Screen name="SkinThicknessComponent" component={SkinThicknessComponent} />



      
      






      </DrawerNav.Navigator>
    </>
  );
};

export default index;
