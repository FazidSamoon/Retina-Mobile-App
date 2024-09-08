import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UserType } from "../../../utils/types/commonTypes";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { useDispatch } from "react-redux";
import { setUserId } from "../../../store/slices/authSlice";

const Greetings = () => {
  const [user, setUser] = useState<UserType>();
  const dispatch = useDispatch()
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    dispatch(setUserId(user?.data?.otherDetails?._id))
    setUser(userObj);
  };
  useEffect(() => {
    void getUser();
  }, []);
  const username = user?.data?.otherDetails?.username;

  const date = new Date();
  const greetText =
    date.getHours() < 12
      ? "Good Morning"
      : date.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
        }}
      >
        Hello {username}!
      </Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
        }}
      >
        {greetText} 🙌
      </Text>
    </View>
  );
};

export default Greetings;

const styles = StyleSheet.create({});
