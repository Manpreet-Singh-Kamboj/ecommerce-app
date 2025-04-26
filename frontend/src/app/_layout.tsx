import React from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LocationProvider } from "@/context/LocationContext";
import ScreensHeader from "@/components/ScreensHeader";
import { Feather } from "@expo/vector-icons";

const RootLayout = () => {
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <LocationProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LocationProvider>
    </>
  );
};

export default RootLayout;
