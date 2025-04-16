import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LocationProvider } from "@/context/LocationContext";

type Props = {};

const _layout = (props: Props) => {
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <LocationProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LocationProvider>
    </>
  );
};

export default _layout;
