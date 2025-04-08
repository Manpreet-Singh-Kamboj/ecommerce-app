import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

type Props = {};

const _layout = (props: Props) => {
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default _layout;
