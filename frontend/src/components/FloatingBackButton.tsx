import { Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";

type Props = {};

const FloatingBackButton = (props: Props) => {
  return (
    <Pressable
      style={[styles.floatingBackButton]}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
    >
      <Entypo name="chevron-left" size={24} color="black" />
    </Pressable>
  );
};

export default FloatingBackButton;

const styles = StyleSheet.create({
  floatingBackButton: {
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: Colors.inputBG,
    padding: 12,
    borderRadius: 30,
    borderWidth: 0.2,
  },
});
