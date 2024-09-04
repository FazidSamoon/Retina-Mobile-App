import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/molecules/Header/Header";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import ChallengeCompletionTracker from "../../../components/molecules/ChallengeCompletionTracker/ChallengeCompletionTracker";
import ChallengesListView from "../../../components/molecules/ChallengesListView/ChallengesListView";
import { checkChallangesAvailability, getMonthlyChallanges } from "../../../api/challanges";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType, VisionTestChallenge, VisionTestChallengesResponse } from "../../../utils/types/commonTypes";

const MonthlyChallengesView = () => {
  const [user, setUser] = useState<UserType>();
  const [challanges, setChallanges] = useState<VisionTestChallenge[]>([]);
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    if (userObj) {
      await checkChallangesAvailability(userObj.data?.otherDetails?._id)
      const {apiError, apiSuccess} = await getMonthlyChallanges(userObj.data?.otherDetails?._id);

      if(apiSuccess) {
        setChallanges(apiSuccess.data)
        setTotalTasks(apiSuccess.data.length)
        setCompletedTasks(apiSuccess?.data?.filter((task: VisionTestChallenge) => task?.status !== "PENDING")?.length)
      }
    }
  };

  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Weekly Chalenges"} />

      <ChallengeCompletionTracker totalTasks={totalTasks} completedTasks={completedTasks}/>
      <ChallengesListView challanges={challanges} />
    </View>
  );
};

export default MonthlyChallengesView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
});
