import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";

type SuccessToastProps = {
  message: string;
};

const SuccessToast = ({ message }: SuccessToastProps) => {
  return Toast.show({
    type: "success",
    text1: message,
  });
};

export default SuccessToast;
