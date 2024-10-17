import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import Icon from "react-native-vector-icons/Ionicons";
import InPerson from "../../../assets/inperson.png";
import VideoConference from "../../../assets/videoconference.png";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  updateChannelingType,
  getChanneling,
} from "../../../store/slices/channelingSlice";
import { RootState } from "../../../store/store";

const Packages = () => {
  const dispatch = useDispatch();
  const { channelingType } = useSelector((state: RootState) => ({
    channelingType: state.channelingReducer.type,
  }));

  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Select Package"} />
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
              LKR: 500
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
              LKR: 500
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
  );
};

export default Packages;

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
