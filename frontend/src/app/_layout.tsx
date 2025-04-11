import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "./(root)/home/_components/header";

type Props = {};

const _layout = (props: Props) => {
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(root)/home/index" options={{headerShown: true, header: () => <Header></Header>}}/>
      </Stack>
    </>
  );
};

export default _layout;
