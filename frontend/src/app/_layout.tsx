import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LocationProvider } from "@/context/LocationContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={10}
      style={{
        borderLeftColor: "#4CAF50",
        borderLeftWidth: 5,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      }}
      text1Style={{
        fontSize: 14,
        flexWrap: "wrap",
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={10}
      text1Style={{
        fontSize: 14,
        flexWrap: "wrap",
      }}
    />
  ),
};

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
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="(onboarding)/welcome/index"
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack>
        <Toast
          position="top"
          topOffset={insets.top > 0 ? insets.top : 15}
          visibilityTime={2000}
          config={toastConfig}
        />
      </LocationProvider>
    </Provider>
  );
};

export default RootLayout;
