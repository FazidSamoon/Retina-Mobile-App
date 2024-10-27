import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { getDataFromAsyncStorage, showToastWithGravityAndOffset } from "../../../utils/common/commonUtil";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setChannelingData } from "../../../store/slices/channelingSlice";
import { getChannelingAvailability } from "../../../api/channeling";
import { UserType } from "../../../utils/types/commonTypes";

const ChannelDocFromList = () => {
  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState<UserType>();
  const [selected, setSelected] = useState("");
  const [availbleScheduling, setAvailableScheduling] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [slots, setSlots] = useState([]);
  const getDocData = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);
    const a = await getDataFromAsyncStorage("channelDocFromList");
    setDoctor(a);
  };

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  useEffect(() => {
    void getDocData();
  }, []);

  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };

  const getDay = (day: number) => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[day];
  };

  function createTimeSlots(start, end) {
    const slots = [];

    while (start < end) {
      const nextSlot = new Date(start.getTime() + 30 * 60000);
      slots.push({
        start: start.toTimeString().slice(0, 5),
        end: nextSlot.toTimeString().slice(0, 5),
      });
      start = nextSlot;
    }

    return slots;
  }

  const checkAvailabililty = (date: string) => {
    const day = new Date(date).getDay();
    const dayStr = getDay(day);

    const scheduleForDay = doctor.channelingSchedule[dayStr];

    if (!scheduleForDay || scheduleForDay.length === 0) {
      setAvailableScheduling(false);
    } else {
      setAvailableScheduling(true);

      let startTime = new Date(`${date}T${scheduleForDay[0].start}`);
      let endTime = new Date(`${date}T${scheduleForDay[0].end}`);

      startTime = new Date(startTime.getTime() + 330 * 60000);
      endTime = new Date(endTime.getTime() + 330 * 60000);

      setSlots(createTimeSlots(startTime, endTime));
    }
  };

  const handleAddingChanneling = async () => {
    const { apiError, apiSuccess } = await getChannelingAvailability({
      doctorId: doctor._id,
      date: selected,
      endTime: selectedSlot.end,
      startTime: selectedSlot.start,
    });

    if (apiSuccess) {
      console.log(apiSuccess);
      if (apiSuccess.data.available) {
        dispatch(
          setChannelingData({
            doctorId: doctor._id,
            date: selected,
            slot: {
              end: selectedSlot.end,
              start: selectedSlot.start,
            },
            status: "PENDING",
            type: "IN-HOUSE",
            payment: "POINTS",
            userId: user.data.otherDetails._id,
          })
        );

        navigation.navigate("ChannelFromListPackageSelect");
      } else {
        showToastWithGravityAndOffset("Selected time slot is not availble");
      }
    }
  };

  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Book Appointment"} />

      <View>
        <View
          style={{
            height: 140,
            width: "100%",
            flexDirection: "row",
            gap: 20,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: "#F2F2F2",
              borderRadius: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
              }}
            >
              {nameInitials(doctor?.name)}
            </Text>
          </View>

          <View>
            <View
              style={{
                marginTop: 20,
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Dr. {doctor?.name}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: BASIC_COLORS.FONT_SECONDARY,
                }}
              >
                {doctor?.occupation}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: BASIC_COLORS.FONT_SECONDARY,
                }}
              >
                <Icon name="locate" color={"#109BE7"} size={20} />
                {doctor?.location}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          Select Date
        </Text>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            checkAvailabililty(day.dateString);
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#DBEAFE",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#DBEAFE",
            },
          }}
          style={{
            elevation: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
        />

        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Select Time
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {slots.map((slot) => (
              <Pressable
                style={{
                  backgroundColor:
                    slot === selectedSlot
                      ? BASIC_COLORS.PRIMARY
                      : BASIC_COLORS.BACKGROUND,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                }}
                onPress={() => {
                  setSelectedSlot(slot);
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color:
                      slot === selectedSlot
                        ? BASIC_COLORS.WHITE
                        : BASIC_COLORS.FONT_PRIMARY,
                  }}
                >
                  {slot.start}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selected && selectedSlot && (
          <RPPrimaryButton
            buttonTitle={"Request An Appointment"}
            onPress={handleAddingChanneling}
          />
        )}
      </View>
    </View>
  );
};

export default ChannelDocFromList;

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
