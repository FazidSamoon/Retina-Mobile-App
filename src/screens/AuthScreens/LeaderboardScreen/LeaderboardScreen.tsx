import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LeaderBoardContainer from "../../../components/organisms/LeaderBoardContainer/LeaderBoardContainer";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { UserType } from "../../../utils/types/commonTypes";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { getLeaderboard, getUserLevels } from "../../../api/challanges";

const LeaderboardScreen = () => {
  const [user, setUser] = useState<UserType>();
  const [leaderboard, setLeaderboards]= useState([]);

  const [levelData, setLevelData] = useState({
    level: 1,
    xpGained: 0
  })

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const {apiError: levelError, apiSuccess: levelSuccess} = await getUserLevels(userObj?.data?.otherDetails?._id)
    const {apiError, apiSuccess} = await getLeaderboard(userObj?.data?.otherDetails?._id)

    if (levelSuccess) {
      setLevelData({
        level: levelSuccess.level,
        xpGained: levelSuccess.xpGained
      })
    }
    if (apiSuccess) {
      setLeaderboards(apiSuccess.data)
    }
  };

  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Leaderboard"} />
      <LeaderBoardContainer level={levelData} leaderboard={leaderboard}/>
    </View>
  );
};

export default LeaderboardScreen;

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
