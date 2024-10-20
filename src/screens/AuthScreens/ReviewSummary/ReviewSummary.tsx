import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { UserType } from "../../../utils/types/commonTypes";
import {
  getDataFromAsyncStorage,
  showToastWithGravityAndOffset,
} from "../../../utils/common/commonUtil";
import { getUserSubscriptions } from "../../../api/challanges";
import Icon from "react-native-vector-icons/Ionicons";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { useSelector } from "react-redux";
import { format } from "date-fns"; // Assuming this is your path
import { getChanneling } from "../../../store/slices/channelingSlice";
import { RootState } from "../../../store/store";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import CompletionLogo from "../../../assets/CompletionLogo";
import { Modal } from "react-native";
import { addChanneling } from "../../../api/channeling";
import { useNavigation } from "@react-navigation/native";

const ReviewSummary = () => {
  const [user, setUser] = useState<UserType>();
  const [doctor, setDoctor] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation<any>();

  const channelingData = useSelector(
    (state: RootState) => state.channelingReducer
  );

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError, apiSuccess } = await getUserSubscriptions(
      userObj.data.otherDetails._id
    );
    if (apiSuccess) {
      setDoctor(apiSuccess.data);
    }
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

  const formatTimeSlot = (start: string, end: string) => {
    return `${format(new Date(start), "hh:mm a")} - ${format(
      new Date(end),
      "hh:mm a"
    )}`;
  };

  const onSubmit = async () => {
    const payload = {
      doctorId: channelingData.doctorId,
      date: channelingData.date,
      startTime: channelingData.slot.start,
      endTime: channelingData.slot.end,
      userId: user.data.otherDetails._id,
      type: channelingData.type,
    };

    const { apiError, apiSuccess } = await addChanneling(payload);

    if (apiError) {
      showToastWithGravityAndOffset("Error while processing the request");
    } else if (apiSuccess) {
      setShowModal(true);
    }
  };
  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Review Summary"} />
      <View
        style={{
          height: "100%",
          justifyContent: "space-between",
          paddingBottom: 60,
        }}
      >
        <View>
          <View style={styles.doctorContainer}>
            <View style={styles.doctorImage}>
              <Text style={styles.doctorInitials}>
                {nameInitials(doctor[0]?.doctor?.name)}
              </Text>
            </View>

            <View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>
                  Dr. {doctor[0]?.doctor?.name}
                </Text>
                <Text style={styles.doctorOccupation}>
                  {doctor[0]?.doctor?.occupation}
                </Text>
                <Text style={styles.doctorLocation}>
                  <Icon name="locate" color={"#109BE7"} size={20} />
                  {doctor[0]?.doctor?.location}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>
              {channelingData.date}:{channelingData.slot.start}-
              {channelingData.slot.end}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Channeling Type</Text>
            <Text style={styles.value}>{channelingData.type}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{channelingData.status}</Text>
          </View>
        </View>

        <RPPrimaryButton
          buttonTitle="Request An Appointmnet"
          onPress={onSubmit}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              paddingVertical: 30,
              borderRadius: 30,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <CompletionLogo />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Congratulations!
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              You have Successfully Requested a appointment
            </Text>

            <View
              style={{
                marginTop: 30,
                width: "80%",
              }}
            >
              <RPPrimaryButton
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Home");
                }}
                buttonTitle={"Go to home"}
                buttonStyle={{ borderRadius: 30 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReviewSummary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  doctorContainer: {
    height: 140,
    width: "100%",
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
  },
  doctorImage: {
    height: 100,
    width: 100,
    backgroundColor: "#F2F2F2",
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  doctorInitials: {
    fontSize: 32,
    fontWeight: "800",
  },
  doctorDetails: {
    marginTop: 20,
    gap: 5,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
  },
  doctorOccupation: {
    fontSize: 14,
    fontWeight: "600",
    color: BASIC_COLORS.FONT_SECONDARY,
  },
  doctorLocation: {
    fontSize: 14,
    fontWeight: "600",
    color: BASIC_COLORS.FONT_SECONDARY,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,

    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    color: BASIC_COLORS.FONT_SECONDARY,
  },
});
