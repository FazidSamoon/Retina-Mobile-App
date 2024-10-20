import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../../utils/types/commonTypes";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { getUserRewards } from "../../../api/channeling";

const Payments = () => {
  const [user, setUser] = useState<UserType>();

  const [userRewards, setUserRewards] = useState<{
    expires_on: string;
    points: number;
    redeemed: number;
  }>({
    expires_on: "",
    points: 0,
    redeemed: 0,
  });

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError, apiSuccess } = await getUserRewards(
      userObj?.data?.otherDetails?._id
    );

    if (apiError) {
      console.log("apiError ", apiError);
    } else if (apiSuccess) {
      setUserRewards(apiSuccess.data);
    }
  };
  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Select Payment"} />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Redeemable Points
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
          }}
        >
          {userRewards?.points - userRewards.redeemed}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          You can redeem {userRewards?.points - userRewards.redeemed} for this
          reservation
        </Text>
      </View>
    </View>
  );
};

export default Payments;

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
