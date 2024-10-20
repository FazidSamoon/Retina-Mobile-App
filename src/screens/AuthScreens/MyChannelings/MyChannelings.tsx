import { StyleSheet, Text, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import {
  getDataFromAsyncStorage,
  showToastWithGravityAndOffset,
} from "../../../utils/common/commonUtil";
import { Channeling, UserType } from "../../../utils/types/commonTypes";
import { getChannelingsByPatient } from "../../../api/channeling";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import moment from "moment";

const MyChannelings = () => {
  const [user, setUser] = useState<UserType>();
  const [channelings, setChannelings] = useState<Channeling[]>([]);
  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError, apiSuccess } = await getChannelingsByPatient(
      userObj.data.otherDetails._id
    );
    if (apiSuccess) {
      console.log(apiSuccess);
      setChannelings(apiSuccess);
    } else if (apiError) {
      showToastWithGravityAndOffset("Error while fetching data");
    }
  };

  const openGoogleMeet = (link: string) => {
    Linking.openURL(link);
  };

  const isToday = (date: string) => {
    const today = moment().format("YYYY-MM-DD");
    const channelingDate = moment(date).format("YYYY-MM-DD");
    return today === channelingDate;
  };

  useEffect(() => {
    void getUser();
  }, []);
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Channeling History"} />
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          My Channelings
        </Text>

        <View
          style={{
            gap: 10,
            marginTop: 20,
          }}
        >
          {channelings.length > 0 &&
            channelings.map((item) => (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: BASIC_COLORS.FONT_SECONDARY,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Channeling Id:
                  </Text>
                  <Text
                    style={{
                      color: BASIC_COLORS.FONT_SECONDARY,
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    {item._id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Doctor name:
                  </Text>
                  <Text
                    style={{
                      color: BASIC_COLORS.FONT_SECONDARY,
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    {item?.doctor?.name ?? ""}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Date:
                  </Text>
                  <Text
                    style={{
                      color: BASIC_COLORS.FONT_SECONDARY,
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    {item.date.split("T")[0]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Time:
                  </Text>
                  <Text
                    style={{
                      color: BASIC_COLORS.FONT_SECONDARY,
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    {item.timeSlot.start} - {item.timeSlot.end}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Type:
                  </Text>
                  <Text
                    style={{
                      color: BASIC_COLORS.FONT_SECONDARY,
                      fontSize: 16,
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    {item.type}
                  </Text>
                </View>

                {isToday(item.date) && (
                  <RPPrimaryButton
                    buttonTitle="Open in Google Meet"
                    onPress={() => openGoogleMeet(item.meetLink)}
                    buttonStyle={{
                      marginTop: 10,
                    }}
                  />
                )}
              </View>
            ))}

          {channelings.length === 0 && (
            <View>
              <Text>No channelings availalbe</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MyChannelings;

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
