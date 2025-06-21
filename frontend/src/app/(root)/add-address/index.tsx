import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

type Props = {};

const AddAddressScreen = (props: Props) => {
  return (
    <View>
      <StatusBar translucent style="light" />
      <Text>AddAddressScreen</Text>
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
