import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { getDataFromAsyncStorage } from "../../../utils/common/commonUtil";
import { UserType } from "../../../utils/types/commonTypes";
import { getUserSubscriptions } from "../../../api/challanges";

const MySubscriptions = () => {
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState<UserType>();

  const [availbleScheduling, setAvailableScheduling] = useState(false);
  const [doctor, setDoctor] = useState([]);

  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };

  const getUser = async () => {
    const userObj = await getDataFromAsyncStorage("user");
    setUser(userObj);

    const { apiError, apiSuccess } = await getUserSubscriptions(
      userObj.data.otherDetails._id
    );
    if (apiSuccess) {
      console.log("sssss ", apiSuccess.data);
      setDoctor(apiSuccess.data);
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

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
  const checkAvailabililty = (date: string) => {
    const day = new Date(date).getDay();
    const dayStr = getDay(day);

    // Assuming doctor[0].doctor.channelingSchedule contains the schedule
    const scheduleForDay = doctor[0].doctor.channelingSchedule[dayStr];

    if (!scheduleForDay || scheduleForDay.length === 0) {
      setAvailableScheduling(false); // No slots available for this day
    } else {
      setAvailableScheduling(true);

      let startTime = new Date(`${date}T${scheduleForDay[0].start}`)
      let endTime = new Date(`${date}T${scheduleForDay[0].end}`)

      startTime = new Date(startTime.getTime() + 330 * 60000);
      endTime = new Date(endTime.getTime() + 330 * 60000);

      createTimeSlots(startTime, endTime)
    }
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

    console.log("fffff ", slots)
    return slots;
  }

  return (
    <View style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Book Appointment"} />

      {doctor.length > 0 ? (
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
                {nameInitials(doctor[0].doctor.name)}
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
                  Dr. {doctor[0]?.doctor?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: BASIC_COLORS.FONT_SECONDARY,
                  }}
                >
                  {doctor[0]?.doctor?.occupation}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: BASIC_COLORS.FONT_SECONDARY,
                  }}
                >
                  <Icon name="locate" color={"#109BE7"} size={20} />
                  {doctor[0]?.doctor?.location}
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
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginTop: 10,
              }}
            >
              Select Date
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text>No Subscriptions Available</Text>
        </View>
      )}
    </View>
  );
};

export default MySubscriptions;

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
