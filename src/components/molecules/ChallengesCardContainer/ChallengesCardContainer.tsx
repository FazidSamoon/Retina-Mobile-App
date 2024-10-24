import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WeeklyChallengesCard from "./WeeklyChallengesCard";
import MonthlyChallengesCard from "./MonthlyChallengesCard";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import {
  UserType,
  VisionTestChallenge,
  VisionTestChallengesResponse,
} from "../../../utils/types/commonTypes";
import {
  checkChallangesAvailability,
  getLeaderboard,
  getMonthlyChallanges,
} from "../../../api/challanges";
import { useDispatch } from "react-redux";
import { setChallenges } from "../../../store/slices/visionTestChallengesSlice";

const ChallengesCardContainer = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserType>();
  const [challanges, setChallanges] = useState<VisionTestChallenge[]>([]);
  const [leaderboard, setLeaderboards] = useState([]);
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    if (userObj) {
      await checkChallangesAvailability(userObj.data?.otherDetails?._id);
      const { apiError, apiSuccess } = await getMonthlyChallanges(
        userObj.data?.otherDetails?._id
      );
      if (apiSuccess) {
        dispatch(setChallenges(apiSuccess.data));
        setChallanges(apiSuccess.data);
      }
    }

    const { apiError: leaderBoardApiError, apiSuccess: leaderBoardApiSuccess } =
      await getLeaderboard(userObj?.data?.otherDetails?._id);

    if (leaderBoardApiSuccess) {
      const nameInitials = (name: string) => {
        const words = name?.split(" ");
        return words
          ?.slice(0, 2)
          ?.map((word) => word[0]?.toUpperCase())
          ?.join("");
      };
      
      setLeaderboards(
        leaderBoardApiSuccess.data.map((item) => ({
          title: nameInitials(item.user.name),
        }))
      );
    }
  };


  console.log("fafa ", leaderboard)
  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        marginTop: 30,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <WeeklyChallengesCard user={user} challanges={challanges} leaderboard={leaderboard}/>
        {/* <MonthlyChallengesCard /> */}
      </ScrollView>
    </View>
  );
};

export default ChallengesCardContainer;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 172,
    borderRadius: 20,
    backgroundColor: "red",
    gap: 20,
    marginRight: 10,
    // padding: 20,
  },
});
