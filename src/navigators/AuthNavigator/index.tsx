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
        <DrawerNav.Screen name="ShortDistanceVisionTest" component={ShortDistanceVisionTestScreen} />
        <DrawerNav.Screen name="MonthlyChallenges" component={MonthlyChallengesView} />
        <DrawerNav.Screen name="Leaderboard" component={LeaderboardScreen} />
        <DrawerNav.Screen name="ChannelDoctorsScreen" component={ChannelDoctorsScreen} />
      </DrawerNav.Navigator>
    </>
  );
};

export default index;
