import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "@/context/LocationContext";
import LocationHeader from "@/components/Location/LocationHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import FloatingBackButton from "@/components/FloatingBackButton";
import LocationIcon from "@/components/icons/LocationIcon";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import MAP_STYLE from "@/constants/map-style.json";

export default function ManualLocationRequestScreen() {
  const { location, setLocation } = useContext(LocationContext);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const mapRef = React.useRef<MapView>(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationPermissionDenied(true);
      return;
    }
    try {
      setLocationPermissionDenied(false);
      const location = await Location.getCurrentPositionAsync();
      setLocation(location.coords);
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve location. Please try again.");
    }
  };

  useEffect(() => {
    if (!location || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      500
    );
  }, [location]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const insets = useSafeAreaInsets();
  if (locationPermissionDenied && !location) {
    return (
      <SafeAreaWrapper>
        <FloatingBackButton />
        <View style={styles.fallbackCard}>
          <View style={styles.iconWrapper}>
            <LocationIcon />
          </View>
          <Text style={styles.heading}>Enable Location Access</Text>
          <Text style={styles.description}>
            To recommend popular sneakers in your area and set your delivery
            location, we need access to your location. Tap below to enable it
            from settings.
          </Text>
          <Pressable
            style={styles.ctaButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.ctaText}>Open Settings</Text>
          </Pressable>
        </View>
      </SafeAreaWrapper>
    );
  }
  return (
    location != null && (
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
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          customMapStyle={MAP_STYLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation
          onPoiClick={(poi) => {
            setLocation(
              poi.nativeEvent.coordinate as Location.LocationObjectCoords
            );
          }}
          onPress={(mapPressEvent) =>
            setLocation(
              mapPressEvent.nativeEvent
                .coordinate as Location.LocationObjectCoords
            )
          }
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable
            onDragEnd={(markerDragEvent) =>
              setLocation(
                markerDragEvent.nativeEvent
                  .coordinate as Location.LocationObjectCoords
              )
            }
          />
        </MapView>
        <Pressable
          onPress={() => {
            if (location) {
              router.navigate("/home");
            }
          }}
          style={{
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            bottom: insets.bottom === 0 ? 20 : insets.bottom + 15,
            right: 16,
            backgroundColor: Colors.secondaryBG,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 32,
          }}
        >
          <Text
            style={{
              color: Colors.primaryBG,
              fontWeight: "600",
              fontSize: 18,
              marginRight: 4,
            }}
          >
            Continue
          </Text>
          <Entypo name="chevron-right" size={24} color={Colors.primaryBG} />
        </Pressable>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: Colors.primaryBG,
    padding: 24,
  },
  fallbackCard: {
    padding: 32,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: Colors.inputBG,
    padding: 16,
    borderRadius: 50,
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: Colors.secondaryBG,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaText: {
    color: Colors.paginationActive,
    fontSize: 16,
    fontWeight: "600",
  },
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
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
