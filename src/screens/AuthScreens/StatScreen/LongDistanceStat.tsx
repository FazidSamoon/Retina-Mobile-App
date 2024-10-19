import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LongDistanceVisionStats from "../../../components/molecules/LongDistanceVisionStats/LongDistanceVisionStats";
import { UserType } from "../../../utils/types/commonTypes";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";

const LongDistanceStat = () => {
  const [user, setUser] = useState<UserType>();
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);
  };

  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Long Distance Stats"} />
      <ScrollView>
        <LongDistanceVisionStats user={user} />
      </ScrollView>
    </View>
  );
};

export default LongDistanceStat;

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
