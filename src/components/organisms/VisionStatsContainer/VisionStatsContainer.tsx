import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LongDistanceVisionStats from "../../molecules/LongDistanceVisionStats/LongDistanceVisionStats";
import ShortDistanceVisionStats from "../../molecules/ShortDistanceVisionStats/ShortDistanceVisionStats";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType } from "../../../utils/types/commonTypes";
import { ScrollView } from "react-native-gesture-handler";

const VisionStatsContainer = () => {
    const [user, setUser] = useState<UserType>();
    const getUser = async () => {
      const userObj = await getDataFromAsyncStorage("user");
      setUser(userObj);
    };
  
    useEffect(() => {
      void getUser();
    }, []);
  return (
    <ScrollView>
      <LongDistanceVisionStats user={user}/>
      <ShortDistanceVisionStats user={user}/>
    </ScrollView>
  );
};

export default VisionStatsContainer;

const styles = StyleSheet.create({});
