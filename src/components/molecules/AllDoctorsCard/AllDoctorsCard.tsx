import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../api/config";
import axios from "axios";
import axiosInstance from "../../../api/axiosConfig";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import { useNavigation } from "@react-navigation/native";


const AllDoctorsCard = () => {
    const navigation = useNavigation<any>()
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const url = `${API_URL}/doctor`;
      const response = await axios.get(url);
      return response.data;
    },
    queryKey: ["allDoctors"],
  });

  useEffect(() => {
    if (data && !isLoading) {
      setDoctors(data.data);
    }
  }, [data, isLoading]);

  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };

  return (
    <View>


      <Pressable
        style={{
          backgroundColor: "#DBEAFE",
          width: "100%",
          height: 50,
          marginBottom: 20,
          borderRadius: 10,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 10
        }}

        onPress={() => navigation.navigate("MySubscriptions")}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: "#109BE7",
          }}
        >
          Go To My Subscriptions
        </Text>
        <Icon name="arrow-forward" color={"#109BE7"} size={30} />
      </Pressable>


      <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            marginBottom: 20
          }}
        >
          Find Doctors
        </Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: "#E9F1FF",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Icon name="search" color={"#848A94"} size={30} />
        <TextInput
          placeholder={"Search"}
          style={{
            width: "90%",
            color: BASIC_COLORS.FONT_SECONDARY,
            fontSize: 20,
          }}
          onChangeText={() => {}}
          editable={true}
          value={searchTerm}
        />
      </View>
      <ScrollView>
        {doctors.length > 0 &&
          !isLoading &&
          doctors.map((doc) => (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: "white",
                  borderColor: "#E9F1FF",
                  borderWidth: 1,
                  elevation: 5,
                },
              ]}
            >
              <View
                style={{
                  height: "77%",
                  width: "100%",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "30%",
                    backgroundColor: "#F2F2F2",
                    borderRadius: 20,
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
                    {nameInitials(doc.name)}
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      backgroundColor: "#DBEAFE",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      flexDirection: "row",
                      gap: 5,
                      borderRadius: 30,
                    }}
                  >
                    <Icon name="star" color={"#109BE7"} size={20} />
                    <Text
                      style={{
                        color: "#109BE7",
                      }}
                    >
                      {doc.occupation}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Dr. {doc.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: BASIC_COLORS.FONT_SECONDARY,
                      }}
                    >
                      {doc.location}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      {[1, 2, 3, 4].map((rate) => (
                        <Icon name="star" color={"#FCAF23"} size={20} />
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              <Pressable
                style={{
                  backgroundColor: "#DBEAFE",
                  width: "100%",
                  height: "23%",
                  borderRadius: 10,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    color: "#109BE7",
                  }}
                >
                  Subscribe
                </Text>
              </Pressable>
              {/* <RPPrimaryButton buttonTitle="Subscribe" buttonStyle={{
                backgroundColor: "#DBEAFE",
                color: BASIC_COLORS.PRIMARY
              }}/> */}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default AllDoctorsCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: 210,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 2,
  },
});
