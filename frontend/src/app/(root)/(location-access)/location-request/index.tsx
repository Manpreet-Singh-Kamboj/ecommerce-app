import {
  Alert,
  Linking,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext } from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import LocationIcon from "@/components/icons/LocationIcon";
import { Colors } from "@/constants/colors";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";
import Button from "@/components/Button";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { LocationContext } from "@/context/LocationContext";
import FloatingBackButton from "@/components/FloatingBackButton";
import { StackAnimationTypes } from "react-native-screens";

const LocationRequest = () => {
  const { width } = useWindowDimensions();
  const { setLocation } = useContext(LocationContext);
  const params = useLocalSearchParams<{ animation: StackAnimationTypes }>();
  const getLocationAccess = async () => {
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
      router.navigate("home");
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve location. Please try again.");
    }
  };
  return (
    <SafeAreaWrapper>
      <Stack.Screen
        options={{
          animation: params.animation || "default",
          animationDuration: params.animation ? 250 : undefined,
        }}
      />
      <FloatingBackButton />
      <View
        style={{
          width,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          gap: 40,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.inputBG,
            padding: 20,
            borderRadius: 50,
          }}
        >
          <LocationIcon />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <PageHeading heading="What is Your Location?" fontWeight={"600"} />
          <PageDescription
            description={`We need to know your location in order to suggest \n nearby services.`}
          />
        </View>
        <View style={{ width, gap: 20 }}>
          <Button
            text="Allow Location Access"
            onPress={getLocationAccess}
            customStyle={{
              marginHorizontal: 25,
              borderRadius: 25,
            }}
            textColor="#fff"
            backgroundColor={Colors.secondaryBG}
          />
          <Button
            text="Enter Location Manually"
            onPress={() => {
              router.navigate("manual-location-request");
            }}
            customStyle={{
              marginHorizontal: 25,
              borderRadius: 25,
            }}
            textColor={Colors.secondaryBG}
            backgroundColor={Colors.primaryBG}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default LocationRequest;

const styles = StyleSheet.create({});
