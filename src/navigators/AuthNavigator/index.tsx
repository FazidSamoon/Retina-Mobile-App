import React from "react";
import { Text, View } from "react-native";
import RPDrawer from "../../components/atoms/RPDrawer/RPDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/AuthScreens/HomeScreen/HomeScreen";
import VisionTestHomeScreen from "../../screens/AuthScreens/VisionTestHomeScreen/VisionTestHomeScreen";
import EyeExerciseHome from "../../screens/AuthScreens/EyeExerciseHome/EyeExerciseHome";
import LongDistanceVisionTestScreen from "../../screens/AuthScreens/LongDistanceVisionTestScreen/LongDistanceVisionTestScreen";
import ShortDistanceVisionTestScreen from "../../screens/AuthScreens/ShortDistanceVisionTestScreen/ShortDistanceVisionTestScreen";
import MonthlyChallengesView from "../../screens/AuthScreens/MonthlyChallengesScreen/MonthlyChallengesView";
import LeaderboardScreen from "../../screens/AuthScreens/LeaderboardScreen/LeaderboardScreen";
import ChannelDoctorsScreen from "../../screens/AuthScreens/ChannelDoctors/ChannelDoctorsScreen";
import StatScreen from "../../screens/AuthScreens/StatScreen/StatScreen";
import ShortDistanceStat from "../../screens/AuthScreens/StatScreen/ShortDistanceStat";
import LongDistanceStat from "../../screens/AuthScreens/StatScreen/LongDistanceStat";
import MySubscriptions from "../../screens/AuthScreens/MySubscriptions/MySubscriptions";
import RecommendHome from "../../screens/AuthScreens/RecommendHome/RecommendHome";
import MealsRecommend from "../../screens/AuthScreens/MealsRecommend/MealsRecommend";
import ExerciseRecommend from "../../screens/AuthScreens/ExerciseRecommend/Exerciserecommend";
import MyRecommondation from "../../screens/AuthScreens/MealsRecommend/MyRecommondation";
import Packages from "../../screens/AuthScreens/Packages/Packages";
import Diabatic from "../../screens/RetinopathyScreens/Diabatic/Diabatic";
import DiabaticResult from "../../screens/RetinopathyScreens/Diabatic/DiabaticResult";
import Retinopathy from "../../screens/RetinopathyScreens/Retinopathy/Retinopathy";
import HealthTips from "../../screens/RetinopathyScreens/AfterPrediction/HealthTips";
import RetinopathyResult from "../../screens/RetinopathyScreens/Retinopathy/RetinopathyResult";
import RetinopathyInfo from "../../screens/RetinopathyScreens/Instruction/RetinopathyInfo";
import BMICalculator from "../../screens/RetinopathyScreens/Instruction/BMICalculator";
import NextScreeningInterval from "../../screens/RetinopathyScreens/AfterPrediction/NextScreeningPositive";
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
import RetinClinicLo from "../../screens/RetinopathyScreens/RetinopathyMaps/RetinClinicLoc";
import Survay from "../../screens/RetinopathyScreens/Survay/Survay";
import SurvayPrediction from "../../screens/RetinopathyScreens/Survay/SurvayPrediction";
import SurvayContribution from "../../screens/RetinopathyScreens/Survay/SurvayContribution";
import PredictionMain from "../../screens/RetinopathyScreens/PredictionMain/PredictionMain";

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
        <DrawerNav.Screen
          name="VisionTestHome"
          component={VisionTestHomeScreen}
        />
        <DrawerNav.Screen
          name="EyeExercisiseHome"
          component={EyeExerciseHome}
        />
        <DrawerNav.Screen
          name="MonthlyChallenges"
          component={MonthlyChallengesView}
        />
        <DrawerNav.Screen
          name="LongDistanceVisionTest"
          component={LongDistanceVisionTestScreen}
        />
        <DrawerNav.Screen name="Leaderboard" component={LeaderboardScreen} />
        <DrawerNav.Screen
          name="ChannelDoctorsScreen"
          component={ChannelDoctorsScreen}
        />
        <DrawerNav.Screen name="StatScreen" component={StatScreen} />
        <DrawerNav.Screen
          name="ShortDistanceStat"
          component={ShortDistanceStat}
        />
        <DrawerNav.Screen
          name="LongDistanceStat"
          component={LongDistanceStat}
        />
        <DrawerNav.Screen name="MySubscriptions" component={MySubscriptions} />
        <DrawerNav.Screen
          name="ShortDistanceVisionTest"
          component={ShortDistanceVisionTestScreen}
        />
        <DrawerNav.Screen name="RecommendHome" component={RecommendHome} />
        <DrawerNav.Screen name="MealsRecommend" component={MealsRecommend} />
        <DrawerNav.Screen
          name="ExerciseRecommend"
          component={ExerciseRecommend}
        />
        <DrawerNav.Screen
          name="MyRecommondation"
          component={MyRecommondation}
        />
        <DrawerNav.Screen name="ChannelingPackages" component={Packages} />

        <DrawerNav.Screen name="Diabatic" component={Diabatic} />
        <DrawerNav.Screen name="ResultScreen" component={DiabaticResult} />
        <DrawerNav.Screen name="Retinopathy" component={Retinopathy} />
        <DrawerNav.Screen name="HealthTips" component={HealthTips} />
        <DrawerNav.Screen name="RetinClinicLoc" component={RetinClinicLo} />
        <DrawerNav.Screen
          name="RetinopathyResult"
          component={RetinopathyResult}
        />
        <DrawerNav.Screen name="RetinopathyInfo" component={RetinopathyInfo} />
        {/* <DrawerNav.Screen name="DiabetesPedigree" component={DiabetesPedigree} /> */}
        <DrawerNav.Screen name="BMICalculator" component={BMICalculator} />
        <DrawerNav.Screen
          name="NextScreeningInterval"
          component={NextScreeningInterval}
        />

        <DrawerNav.Screen name="AvgGlucose" component={AvgGlucose} />
        <DrawerNav.Screen name="DiabetesType" component={DiabetesType} />
        <DrawerNav.Screen name="DiagnosisYear" component={DiagnosisYear} />
        <DrawerNav.Screen name="DiastolicBp" component={DiastolicBp} />
        <DrawerNav.Screen name="Hba1c" component={Hba1c} />
        <DrawerNav.Screen name="SystolicBp" component={SystolicBp} />
        <DrawerNav.Screen name="Survay" component={Survay} />
        {/* <DrawerNav.Screen name="Survay" component={Survay} />
        <DrawerNav.Screen name="Survay" component={Survay} />
        <DrawerNav.screen name=""
        
        
        
        
        
        */}

      
        <DrawerNav.Screen
          name="SurvayPrediction"
          component={SurvayPrediction}
        />
        <DrawerNav.Screen
          name="SurvayContribution"
          component={SurvayContribution}
        />
        <DrawerNav.Screen name="PredictionMain" component={PredictionMain} />

        <DrawerNav.Screen
          name="GlucoseComponent"
          component={GlucoseComponent}
        />
        <DrawerNav.Screen
          name="BloodPressureComponent"
          component={BloodPressureComponent}
        />
        <DrawerNav.Screen
          name="InsulinComponent"
          component={InsulinComponent}
        />
        <DrawerNav.Screen
          name="SkinThicknessComponent"
          component={SkinThicknessComponent}
        />
      </DrawerNav.Navigator>
    </>
  );
};

export default index;
