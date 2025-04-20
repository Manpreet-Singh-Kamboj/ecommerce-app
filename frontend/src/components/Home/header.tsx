import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LocationIcon from "@/components/icons/LocationIcon";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/colors";
import NotificationIcon from "@/components/icons/NotificationIcon";
import * as Location from "expo-location";
import { LocationContext } from "@/context/LocationContext";

const Header = () => {
  const [currLocation, setCurrentLocation] = useState({
    city: "",
    country: "",
    address: "",
  });
  const { location } = useContext(LocationContext);
  const getLocationFromLatLng = async () => {
    try {
      const currLoc = await Location.reverseGeocodeAsync({
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
      });
      if (currLoc.length > 0) {
        const { city, isoCountryCode, name } = currLoc[0];
        setCurrentLocation({
          city: city ?? "N/A",
          country: isoCountryCode || "N/A",
          address: name ?? "N/A",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getLocationFromLatLng();
  }, []);
  return (
    <View style={[styles.headerContainer]}>
      <View style={{ gap: 3 }}>
        <Text style={{ marginLeft: 4, color: Colors.textMuted }}>
          {currLocation.address}
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
          <LocationIcon width={25} height={25} />
          <Text style={{ color: Colors.textMuted }}>
            {`${currLocation.city}, ${currLocation.country}`}
          </Text>
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
