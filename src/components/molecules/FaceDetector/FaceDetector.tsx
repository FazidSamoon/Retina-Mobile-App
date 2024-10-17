import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as Device from "expo-device";
import { PersonalizedDistance } from "../LongDistanceVisionTest/LongDistanceVIsionTestTypes";

const FaceDetectorComponenet = ({
  fullScreenEnabled = true,
  cameraStyles,
  distanceToMaintain = PersonalizedDistance.ONEMETER,
  handleNotInRange,
  handleInRange,
}: {
  fullScreenEnabled?: boolean;
  cameraStyles?: StyleProp<ViewStyle>;
  distanceToMaintain?: PersonalizedDistance;
  handleNotInRange: () => void;
  handleInRange: () => void;
}) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const cameraRef = useRef(null);
  const [faces, setFaces] = useState([]);

  const estimateDistance = (face) => {
    const faceWidth = face.bounds.size.width;
    const focalLength = 500;
    const realFaceWidth = 0.16;

    const distance = (realFaceWidth * focalLength) / faceWidth;
    if (distance.toFixed(2) < distanceToMaintain.toFixed(2)) handleNotInRange();
    else handleInRange();
    console.log(distance.toFixed(2))
    return distance.toFixed(2);
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        ...styles.container,
        width: fullScreenEnabled
          ? Dimensions.get("screen").width - 50
          : Dimensions.get("screen").width / 2 - 50,
        height: fullScreenEnabled
          ? Dimensions.get("screen").height - 50
          : 250,
      }}
    >
      <Camera
        style={{
          width: fullScreenEnabled
            ? Dimensions.get("screen").width - 50
            : Dimensions.get("screen").width / 2 - 50,
          height: fullScreenEnabled
            ? Dimensions.get("screen").height - 50
            : 250,
          display: "flex",
          alignContent: "flex-end",
        }}
        type={type}
        ref={cameraRef}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 500,
          tracking: true,
        }}
      >
        <View style={styles.buttonContainer}>
          {faces.map((face, index) => (
            <View key={index} style={styles.faceInfo}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginBottom: 100
                }}
              >
                Distance: {estimateDistance(face)} meters
              </Text>
            </View>
          ))}
        </View>
      </Camera>
    </View>
  );
};

export default FaceDetectorComponenet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  faceInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
});
