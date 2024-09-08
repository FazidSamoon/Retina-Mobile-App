import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ShortDistanceVisionStats from "../../../components/molecules/ShortDistanceVisionStats/ShortDistanceVisionStats";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType } from "../../../utils/types/commonTypes";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";

const ShortDistanceStat = () => {
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
      <VisionHomeScreenTopAppBar header={"Short Distance Stats"} />
      <ScrollView>
        <ShortDistanceVisionStats user={user} />
      </ScrollView>
    </View>
  );
};

export default ShortDistanceStat;

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
