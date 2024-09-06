import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { PrimaryRecommondationCardTypes } from "../../organisms/RecommendHomeContainer/RecommondationCardTypes";

const PrimaryRecommondationCard = (props: PrimaryRecommondationCardTypes) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <ImageBackground
        source={props.backgroundSrc}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props?.title ?? ""}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PrimaryRecommondationCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: "hidden",
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 12,
    opacity: 0.8,
  },
  textContainer: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    //textShadowColor: "rgba(0, 0, 0, 0.75)",
    //textShadowOffset: { width: -1, height: 1 },
    //textShadowRadius: 10,
  },
});
