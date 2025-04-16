import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Linking, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "@/context/LocationContext";
import LocationHeader from "@/components/Location/LocationHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function ManualLocationRequestScreen() {
  const { location, setLocation } = useContext(LocationContext);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location Access Denied",
        "To enhance your shopping experience, we need access to your location for personalized recommendations and faster checkout. Please enable location access in your device settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync();
      setLocation(location.coords);
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve location. Please try again.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const insets = useSafeAreaInsets();
  return (
    location?.latitude && (
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.25)", "transparent"]}
          style={[
            styles.headerContainer,
            {
              paddingTop: insets.top === 0 ? 34 : insets.top,
              paddingBottom: insets.bottom === 0 ? 34 : insets.bottom,
            },
          ]}
        >
          <LocationHeader />
        </LinearGradient>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0422,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
