import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

type Props = {};

const _layout = (props: Props) => {
  return (
    <>
      <StatusBar translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default _layout;
