import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import LocationIcon from "@/components/icons/LocationIcon";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/colors";
import NotificationIcon from "@/components/icons/NotificationIcon";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={[styles.headerContainer]}>
      <View style={{ gap: 3 }}>
        <Text style={{ marginLeft: 4, color: Colors.textMuted }}>Location</Text>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
          <LocationIcon width={25} height={25} />
          <Text style={{ color: Colors.textMuted }}>New York, US</Text>
          <Entypo name="chevron-down" size={20} color="black" />
        </View>
      </View>
      <Pressable onPress={() => {}}>
        <NotificationIcon width={40} height={40} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17.5,
    alignItems: "center",
  },
});
