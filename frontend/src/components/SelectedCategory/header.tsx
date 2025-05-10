import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";

type Props = {
  headerTitle: string;
};

const BackButton = () => {
  const handleBackButtonPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <Pressable
      style={[styles.floatingBackButton]}
      onPress={handleBackButtonPress}
    >
      <Entypo name="chevron-left" size={24} color="black" />
    </Pressable>
  );
};

const SelectedCategoryHeader = ({ headerTitle }: Props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const handleSearchButtonPress = () => {
    router.push("/search");
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top : 10,
          paddingBottom: 10,
          width,
        },
      ]}
    >
      <BackButton />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{headerTitle}</Text>
      <Pressable onPress={handleSearchButtonPress}>
        <AntDesign name="search1" size={30} color={Colors.secondaryBG} />
      </Pressable>
    </View>
  );
};

export default SelectedCategoryHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  floatingBackButton: {
    backgroundColor: Colors.inputBG,
    padding: 12,
    borderRadius: 30,
    borderWidth: 0.2,
  },
});
