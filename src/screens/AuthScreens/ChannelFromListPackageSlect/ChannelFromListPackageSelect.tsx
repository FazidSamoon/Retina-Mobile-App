import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { updateChannelingType } from "../../../store/slices/channelingSlice";
import InPerson from "../../../assets/inperson.png";
import VideoConference from "../../../assets/videoconference.png";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserRewards } from "../../../api/channeling";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType } from "../../../utils/types/commonTypes";

const ChannelFromListPackageSelect = () => {
  const dispatch = useDispatch();
  const [points, setPoints] = useState(0);
  const { channelingType } = useSelector((state: RootState) => ({
    channelingType: state.channelingReducer.type,
  }));

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

  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const getUserReward = async () => {
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
    void getUserReward();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Select Package"} />

      <View
        style={{
          height: "100%",
          justifyContent: "space-between",
          paddingBottom: 60,
        }}
      >
        <View>
          <View
            style={{
              width: "100%",

              backgroundColor: BASIC_COLORS.PRIMARY,
              borderRadius: 30,
              padding: 20,
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 5,
              }}
            >
              Available Points
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              {userRewards.points - userRewards.redeemed}
            </Text>
          </View>

          {userRewards.points - userRewards.redeemed < 300 && (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: BASIC_COLORS.ERROR,
                  fontWeight: "600",
                  marginBottom: 20
                }}
              >
                You dont have enough points to process the transaction
              </Text>
            </View>
          )}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Duration
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: "#E0E0E0",
                marginTop: 10,
              }}
            >
              <Icon name="time" color={"#109BE7"} size={24} />

              <Text
                style={{
                  fontSize: 16,
                }}
              >
                30 minutes
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Select Package
            </Text>

            <Pressable
              onPress={() => {
                dispatch(updateChannelingType("IN-HOUSE"));
              }}
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: "#E0E0E0",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <Image source={InPerson} />
              <View
                style={{
                  width: "40%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  In Person
                </Text>
                <Text
                  style={{
                    color: BASIC_COLORS.FONT_SECONDARY,
                  }}
                >
                  In Person Visit With Doctor
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  300 Points
                </Text>
              </View>

              <View
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 10,
                  borderColor:
                    channelingType === "IN-HOUSE"
                      ? BASIC_COLORS.PRIMARY
                      : "#E6E6E6",
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 8,
                    backgroundColor:
                      channelingType === "IN-HOUSE"
                        ? BASIC_COLORS.PRIMARY
                        : "white",
                  }}
                />
              </View>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 10,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: "#E0E0E0",
                marginTop: 10,
                justifyContent: "space-between",
              }}
              onPress={() => {
                dispatch(updateChannelingType("VIDEOCONFERENCE"));
              }}
            >
              <Image source={VideoConference} />
              <View
                style={{
                  width: "40%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  Video Conference
                </Text>
                <Text
                  style={{
                    color: BASIC_COLORS.FONT_SECONDARY,
                  }}
                >
                  Video Conference With Doctor
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  300 Points
                </Text>
              </View>

              <View
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 10,
                  borderColor:
                    channelingType === "VIDEOCONFERENCE"
                      ? BASIC_COLORS.PRIMARY
                      : "#E6E6E6",
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 8,
                    backgroundColor:
                      channelingType === "VIDEOCONFERENCE"
                        ? BASIC_COLORS.PRIMARY
                        : "white",
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>

        {userRewards.points - userRewards.redeemed >= 300 && (
          <View>
            <RPPrimaryButton
              buttonTitle="Next"
              onPress={() => {
                navigation.navigate("ChannelFromListReview");
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ChannelFromListPackageSelect;

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
