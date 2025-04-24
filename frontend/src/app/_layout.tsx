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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(root)/search/index"
            options={{
              headerShown: true,
              header: () => (
                <ScreensHeader
                  leftIcon={
                    <Feather name="chevron-left" size={24} color="black" />
                  }
                  screenName="Search"
                  onLeftIconPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    }
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="(root)/filters/index"
            options={{
              headerShown: true,
              header: () => (
                <ScreensHeader
                  leftIcon={
                    <Feather name="chevron-left" size={24} color="black" />
                  }
                  screenName="Filter"
                  onLeftIconPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    }
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="(root)/notifications/index"
            options={{
              headerShown: true,
              header: () => (
                <ScreensHeader
                  leftIcon={
                    <Feather name="chevron-left" size={24} color="black" />
                  }
                  screenName="Notifications"
                  onLeftIconPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    }
                  }}
                />
              ),
            }}
          />
        </Stack>
      </LocationProvider>
    </>
  );
};

export default RootLayout;
