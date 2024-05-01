import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RPAvatarGroupProps } from "./RPAvatarGroupTypes";
import RPAvatar from "../RPAvatar/RPAvatar";

const RPAvatarGroup = ({
    max = 3,
    ...props 
}: RPAvatarGroupProps) => {
  const maxAvatarsArray = props?.avatars?.slice(0, max);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {maxAvatarsArray?.map((avatar, index) => {
        return (
          <RPAvatar uri={avatar.uri} size={"small"} title={avatar.title} containerStyle={{
            marginLeft: index === 0 ? 0 : -10,
          }}/>
        );
      })}
      {props?.avatars?.length > max ? (
        <View style={{
            width: props.size === "small" ? 35 : 40,
            height: props.size === "small" ? 35 : 40,
            borderRadius: 20,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: -10,
          
        }}>
          <Text
            style={{ includeFontPadding: false }}
            importantForAccessibility="no"
            accessibilityElementsHidden
          >
            +{(props?.avatars?.length || 0) - max}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default RPAvatarGroup;

const styles = StyleSheet.create({});
