import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import VisionTestCard from "../../molecules/VisionTestCard/VisionTestCard";
import { VisionTestData } from "../../molecules/VisionHomeScreenTopAppBar/VisionTestTypeAndData";

const VisionHomeScreenContainer = () => {
  return (
    <View>
      <VisionHomeScreenTopAppBar header={"Check Vision Task"} />
      {VisionTestData?.map((item, index) => {
        return (
          <VisionTestCard
            key={index}
            title={item.title}
            description={item.description}
            onTapLink={item.onTapLink}
            active={item.active}
          />
        );
      })}
    </View>
  );
};

export default VisionHomeScreenContainer;

const styles = StyleSheet.create({});
