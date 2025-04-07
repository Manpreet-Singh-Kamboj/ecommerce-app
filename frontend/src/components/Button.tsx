import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";

type Props = {
  backgroundColor?: string;
  text: string;
  onPress: () => void;
  textColor?: string;
  customStyle?: ViewStyle;
};

const Button = ({
  backgroundColor,
  text,
  onPress,
  textColor,
  customStyle,
}: Props) => {
  return (
    <Pressable
      style={[
        {
          paddingVertical: 15,
          backgroundColor: backgroundColor || "#6F4E37",
          borderRadius: 50,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          color: textColor || "#CEC3BC",
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
