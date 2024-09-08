import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearProgress } from "react-native-elements";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const LeaderBoardContainer = () => {
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
              Level 1
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
                value={5 / 10}
                trackColor="#F4F6F9"
                color={BASIC_COLORS.PRIMARY}
                style={{
                  height: 10,
                  borderRadius: 5,
                  marginTop: 20,
                  marginBottom: 5,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
            fontSize: 20,
            fontWeight: "700"
        }}>Leaderboard</Text>
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
