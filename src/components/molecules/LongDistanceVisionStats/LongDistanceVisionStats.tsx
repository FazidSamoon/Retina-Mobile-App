import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Icon } from "react-native-elements";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import axiosInstance from "../../../api/axiosConfig";
import { UserType } from "../../../utils/types/commonTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import VisionSimulation from "../VisionSimulation/VisionSimulation";
import { getAverageTestScore } from "../../../api/tests";
import { API_URL } from "../../../api/config";

const LongDistanceVisionStats = ({ user }: { user: UserType }) => {
  const windowWidth = Dimensions.get("window").width;
  const [index, setIndex] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [hideDataIndex, setHideDataIndex] = React.useState([]);
  const [leftEye, setLeftEye] = useState(0);
  const [rightEye, setRightEye] = useState(0);
  const { email, verificationCode, userId } = useSelector(
    (state: RootState) => ({
      email: state?.authenticatorReducer?.email,
      verificationCode: state?.authenticatorReducer?.verificationCode,
      userId: state?.authenticatorReducer?.userId,
    })
  );
  const [lineChartDataToShow, setLineChartDataToShow] = React.useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(111, 2, 18, ${opacity})`,
        strokeWidth: 2,
        itemName: "Left eye",
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
        itemName: "Right eye",
      },
    ],
  });

  const chartData = (chatData) => {
    const chartDataToShow = chatData?.datasets?.filter(
      (set, i) => !hideDataIndex.includes(i)
    );
    const data = {
      labels: chatData.labels,
      datasets: chartDataToShow,
    };
    return {
      labels:
        index === 0
          ? chatData?.labels?.slice(0, 6)
          : data?.labels?.slice(6, 12),
      datasets: data?.datasets?.map((set) => {
        return {
          data: index === 0 ? set?.data?.slice(0, 6) : set?.data?.slice(6, 12),
          color: set?.color,
          strokeWidth: set?.strokeWidth,
        };
      }),
    };
  };

  const moveChart = (dir) => {
    dir === "left" ? setIndex(0) : setIndex(6);
  };

  const {
    data: statData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      if (user?.data?.otherDetails?._id || userId) {
        const queryUrl = `${API_URL}/test-results/user-stats/${
          user?.data?.otherDetails?._id ?? userId
        }?month=${month}&year=${year}`;
        // const response = await axiosInstance.get(queryUrl);
        const response = await axios.get(queryUrl);
        return response.data;
      }
    },
    queryKey: ["stats", month, year],
    // enabled:
    //   user?.data?.otherDetails?._id !== null ||
    //   user?.data?.otherDetails?._id === undefined ||
    //   userId !== "" ||
    //   userId !== undefined ||
    //   userId !== null,
  });

  useEffect(() => {
    if (user?.data?.otherDetails?._id || userId) {
      refetch();
    }
  }, [user?.data?.otherDetails?._id, userId]);
  useEffect(() => {
    if (statData && !isLoading) {
      setLineChartDataToShow({
        labels: statData.data.labels,
        datasets: statData?.data?.datasets?.map((item) => {
          return {
            data: item?.data,
            color: (opacity = 1) => item.color,
            strokeWidth: 2,
            itemName: item?.itemName,
          };
        }),
      });
      getAverageTestStats();
    }
  }, [statData, isLoading]);

  const getAverageTestStats = async () => {
    if (
      user?.data?.otherDetails?._id !== null ||
      user?.data?.otherDetails?._id === undefined ||
      userId !== "" ||
      userId !== undefined ||
      userId !== null
    ) {
      const { apiError, apiSuccess } = await getAverageTestScore(
        user?.data?.otherDetails?._id ?? userId
      );
      if (apiSuccess) {
        setRightEye(apiSuccess.data.rightEye);
        setLeftEye(apiSuccess.data.leftEye);
      } else if (apiError) {
        console.log(apiError);
      }
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Overview of the distance vision tests
      </Text>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 30,
            marginTop: 40,
          }}
        >
          {lineChartDataToShow?.datasets.length > 0 &&
            lineChartDataToShow?.datasets?.map((data) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {data.itemName}
                </Text>
                <View
                  style={{
                    width: 25,
                    height: 5,
                    backgroundColor: data.color(),
                  }}
                ></View>
              </View>
            ))}
        </View>
        {lineChartDataToShow.datasets.length > 0 && lineChartDataToShow.datasets[0].data.length > 0 && lineChartDataToShow.datasets[1].data.length ? (
          <LineChart
            data={chartData(lineChartDataToShow) || []}
            width={windowWidth - 60}
            height={220}
            verticalLabelRotation={30}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `#000`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "1",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              width: 490,
            }}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: 250,
              backgroundColor: BASIC_COLORS.BACKGROUND,
            }}
          >
            <Text>No data to show</Text>
            <Text>Please perform Distace vision test to show data</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: BASIC_COLORS.PRIMARY,
              borderRadius: 50,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={index === 0}
            onPress={() => moveChart("left")}
          >
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color="#ffffff"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: BASIC_COLORS.PRIMARY,
              borderRadius: 50,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={
              index === 6 || lineChartDataToShow.datasets[0].data.length < 7
            }
            onPress={() => moveChart("right")}
          >
            <Icon
              name="arrow-forward-outline"
              type="ionicon"
              color="#ffffff"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Left Eye View
        </Text>
        <VisionSimulation logmarValue={leftEye} />

        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          Right Eye View
        </Text>
        <VisionSimulation logmarValue={rightEye} />
      </View>
    </View>
  );
};

export default LongDistanceVisionStats;

const styles = StyleSheet.create({});
