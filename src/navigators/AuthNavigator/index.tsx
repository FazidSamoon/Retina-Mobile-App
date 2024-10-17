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
        <DrawerNav.Screen
          name="ChannelingPackages"
          component={Packages}
        />
      </DrawerNav.Navigator>
    </>
  );
};

export default index;
