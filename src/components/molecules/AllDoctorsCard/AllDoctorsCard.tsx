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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { setDataToAsyncStorage } from "../../../utils/common/commonUtil";

const AllDoctorsCard = () => {
  const navigation = useNavigation<any>();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isFocused = useIsFocused();
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const url = `${API_URL}/doctor`;
      const response = await axios.get(url);
      return response.data;
    },
    enabled: true,
    queryKey: ["allDoctors"],
  });

  useEffect(() => {
    if (data && !isLoading) {
      setDoctors(data.data);
      setFilteredDoctors(data.data); // Initialize with the full list
    }
  }, [data, isLoading]);

  const nameInitials = (name: string) => {
    const words = name?.split(" ");
    return words
      ?.slice(0, 2)
      ?.map((word) => word[0]?.toUpperCase())
      ?.join("");
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    refetch();
  }, [isFocused]);

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
          gap: 10,
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
          Go To My Subscription
        </Text>
        <Icon name="arrow-forward" color={"#109BE7"} size={30} />
      </Pressable>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "800",
          marginBottom: 20,
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
          onChangeText={handleSearch}
          editable={true}
          value={searchTerm}
        />
      </View>
      <ScrollView
        style={{
          height: "70%",
        }}
      >
        {filteredDoctors.length > 0 &&
          !isLoading &&
          filteredDoctors.map((doc) => (
            <View
              key={doc.id}
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
                        <Icon
                          key={rate}
                          name="star"
                          color={"#FCAF23"}
                          size={20}
                        />
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
                onPress={async () => {
                  console.log(doc);
                  await setDataToAsyncStorage("channelDocFromList", doc);
                  navigation.navigate("ChannelDocFromList");
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
