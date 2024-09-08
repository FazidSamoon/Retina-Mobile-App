import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import { useDispatch } from "react-redux";
import { UserType } from "../../../utils/types/commonTypes";
import {
  getDataFromAsyncStorage,
  removeDataFromAsyncStorage,
} from "../../../utils/common/commonUtil";
import Icon from "react-native-vector-icons/Ionicons";
import { BASIC_COLORS } from "../../../utils/constants/styles";

interface Props {
  navigation: NavigationProp<any>;
}
const RPDrawer: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UserType>();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);
  };

  useEffect(() => {
    void getUser();
  }, []);

  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };
  return (
    <View>
      <View
        style={{
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <View
              style={{
                backgroundColor: "#BEBEBE",
                height: 100,
                width: 100,
                borderRadius: 50,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user?.data?.otherDetails?.image ? (
                <View>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    source={{
                      uri: user?.data?.otherDetails?.image,
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "800",
                  }}
                >
                  {nameInitials(user?.data?.otherDetails?.name)}
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                {user?.data?.otherDetails?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {user?.data?.otherDetails?.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              paddingHorizontal: 30,
              gap: 20,
            }}
          >
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  selected === "testStat"
                    ? BASIC_COLORS.PRIMARY
                    : BASIC_COLORS.WHITE,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setSelected("testStat");
                navigation.navigate("StatScreen");
              }}
            >
              <Icon
                name="stats-chart"
                color={
                  selected !== "testStat"
                    ? BASIC_COLORS.FONT_PRIMARY
                    : BASIC_COLORS.WHITE
                }
                size={20}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "500",
                  color:
                    selected !== "testStat"
                      ? BASIC_COLORS.FONT_PRIMARY
                      : BASIC_COLORS.WHITE,
                }}
              >
                Vision Test Stats
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setSelected("person");
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  selected === "person"
                    ? BASIC_COLORS.PRIMARY
                    : BASIC_COLORS.WHITE,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Icon
                name="person"
                color={
                  selected !== "person"
                    ? BASIC_COLORS.FONT_PRIMARY
                    : BASIC_COLORS.WHITE
                }
                size={20}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "500",
                  color:
                    selected !== "person"
                      ? BASIC_COLORS.FONT_PRIMARY
                      : BASIC_COLORS.WHITE,
                }}
              >
                My Profile
              </Text>
            </Pressable>

            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  selected === "settings"
                    ? BASIC_COLORS.PRIMARY
                    : BASIC_COLORS.WHITE,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setSelected("settings");
              }}
            >
              <Icon
                name="settings"
                color={
                  selected !== "settings"
                    ? BASIC_COLORS.FONT_PRIMARY
                    : BASIC_COLORS.WHITE
                }
                size={20}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "500",
                  color:
                    selected !== "settings"
                      ? BASIC_COLORS.FONT_PRIMARY
                      : BASIC_COLORS.WHITE,
                }}
              >
                Settings
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 30,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              marginBottom: 30,
              borderTopWidth: 1,
              borderTopColor: "black",
            }}
            onPress={() => {
              // navigation.navigate("Login");
              removeDataFromAsyncStorage("user");
            }}
          >
            <Icon
              name="log-out"
              color={
                selected !== "person"
                  ? BASIC_COLORS.FONT_PRIMARY
                  : BASIC_COLORS.WHITE
              }
              size={25}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: "500",
                color: BASIC_COLORS.FONT_PRIMARY,
              }}
            >
              Log Out
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RPDrawer;

const styles = StyleSheet.create({});
