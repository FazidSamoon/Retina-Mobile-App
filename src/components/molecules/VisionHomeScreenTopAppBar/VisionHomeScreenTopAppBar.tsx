import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BackArrowHead from "../../../assets/BackArrowHead";
import Voice from "@react-native-voice/voice";
import { VisionTestFlows } from "../../organisms/LongDistanceVisionTestContainer/LongDistanceVisionTestTypes";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { ButtonType } from "../../atoms/RPPrimaryButton/buttonTypes";

const VisionHomeScreenTopAppBar = ({
  header = "Check Vision Task",
  navigateTo,
  setSteps,
  step,
}: {
  header: string;
  navigateTo?: () => void;
  setSteps?: React.Dispatch<React.SetStateAction<VisionTestFlows>>;
  step: VisionTestFlows;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    if (step === VisionTestFlows.TEST_SCREEN) {
      setOpenModal(true);
    } else {
      if (navigateTo) {
        navigateTo();
      } else {
        navigation.goBack();
      }

      stopSpeechToText();

      setSteps && setSteps(VisionTestFlows.TEST_FLOW_SELECTOR);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <TouchableOpacity style={styles.menuContainer} onPress={handleNavigation}>
        <BackArrowHead />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#002055",
        }}
      >
        {header}
      </Text>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
        }}
      ></TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(false);
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.4,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              You are in middle of a test
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Are you sure you want to exit?
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <RPPrimaryButton
                  buttonType={ButtonType.PRIMARY}
                  buttonTitle="No, Stay here"
                  onPress={() => {
                    setOpenModal(false);
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <RPPrimaryButton
                  onPress={() => {
                    setOpenModal(false);
                    navigation.goBack();
                    stopSpeechToText();

                    setSteps && setSteps(VisionTestFlows.TEST_FLOW_SELECTOR);
                  }}
                  buttonType={ButtonType.ERROR}
                  buttonTitle="Yes I Am"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VisionHomeScreenTopAppBar;

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 25,
    borderColor: "#E9F1FF",
    borderWidth: 1,
  },
});
