import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import React from "react";
import { LinearProgress } from "@rneui/base";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const LeaderBoardContainer = ({ level, leaderboard }) => {
  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };
  return (
    <View>
      <View style={styles.achivementCard}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          You are doing good!
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../../assets/achivement.png")}
            style={{
              height: 70,
              width: 70,
            }}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
              }}
            >
              Level {level.level}
            </Text>

            <View
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LinearProgress
                value={(level?.xpGained ?? 5 / 100) / 100}
                color={BASIC_COLORS.WHITE}
                style={{
                  height: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  marginBottom: 5
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                {level.xpGained}/100
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Leaderboard
        </Text>

        <View>
          {leaderboard &&
            leaderboard.length > 0 &&
            leaderboard.map((item, index) => (
              <View
                style={{
                  backgroundColor: "#F0F8FF",
                  width: "100%",
                  height: 75,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: "center",
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderWidth: item.me ? 2 : 0,
                  borderColor: BASIC_COLORS.PRIMARY,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      padding: 3,
                      borderWidth: 2,
                      height: 30,
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                      borderColor: "#E7E8E9",
                    }}
                  >
                    <Text>{index + 1}</Text>
                  </View>

                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: "#C9F2E9",
                      borderRadius: 100,
                      marginLeft: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {nameInitials(item.user.name)}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 18,
                      }}
                    >
                      {item.user.name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 16,
                        color: BASIC_COLORS.FONT_SECONDARY,
                      }}
                    >
                      {item.xpGained} Points
                    </Text>
                  </View>
                </View>

                {(index === 0 || index === 1 || index === 2) && (
                  <View>
                    <Image
                      source={
                        index === 0
                          ? require("../../../assets/Gold.png")
                          : index === 1
                          ? require("../../../assets/Silver.png")
                          : require("../../../assets/Bronze.png")
                      }
                      style={{}}
                    />
                  </View>
                )}
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default LeaderBoardContainer;

const styles = StyleSheet.create({
  achivementCard: {
    backgroundColor: BASIC_COLORS.PRIMARY,
    borderRadius: 30,
    padding: 20,
  },
});
