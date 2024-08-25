import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WeeklyChallengesCard from "./WeeklyChallengesCard";
import MonthlyChallengesCard from "./MonthlyChallengesCard";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType, VisionTestChallengesResponse } from "../../../utils/types/commonTypes";
import { checkChallangesAvailability, getMonthlyChallanges } from "../../../api/challanges";

const ChallengesCardContainer = () => {
  const [user, setUser] = useState<UserType>();
  const [challanges, setChallanges] = useState<VisionTestChallengesResponse[]>([]);
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    if (userObj) {
      await checkChallangesAvailability(userObj.data?.otherDetails?._id)
      const {apiError, apiSuccess} = await getMonthlyChallanges(userObj.data?.otherDetails?._id);

      console.log(apiError, apiSuccess)
      if(apiSuccess) {
        setChallanges(apiSuccess.data)
      }
    }
  };

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
        <WeeklyChallengesCard user={user} />
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
