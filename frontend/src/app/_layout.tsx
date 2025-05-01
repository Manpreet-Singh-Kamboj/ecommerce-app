import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LocationProvider } from "@/context/LocationContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"transparent"} translucent />
      <LocationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "flip" }}
          />
          <Stack.Screen
            name="(root)/home"
            options={{ headerShown: false, animation: "flip" }}
          />
        </Stack>
        <Toast position="top" topOffset={insets.top > 0 ? insets.top : 15} />
      </LocationProvider>
    </Provider>
  );
};

export default RootLayout;
