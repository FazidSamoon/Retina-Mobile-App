import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CategoriesCardType } from "../../organisms/CategoriesContainer/categoriesCardTypes";
import { useNavigation } from "@react-navigation/native";

const CategoriesCard = (props: CategoriesCardType) => {
  const navigation = useNavigation<any>();
  const handlePress = (path: string) => {
    navigation.navigate(path);
  };
  return (
    <TouchableOpacity
      onPress={() => handlePress(props.ontapLink)}
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <View
        style={{
          flexDirection: "row",
          position: "relative",
        }}
      >
        <View
          style={{
            width: "70%",
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            {props?.title ?? ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              marginBottom: 10,
            }}
          >
            {props?.description ?? ""}
          </Text>
          <Pressable
            style={{
              backgroundColor: "#109BE7",
              height: 42,
              width: 110,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
              }}
            >
              Learn More
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            position: "absolute",
            right: -20,
            bottom: -25,
          }}
        >
          <Image
            source={props?.imageSrc}
            style={{
              width: props?.title === "Channel Doctors" ? 152 : 230,
              height: props?.title === "Channel Doctors" ? 152 : 180,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    elevation: 4
  },
});
