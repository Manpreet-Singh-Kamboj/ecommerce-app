import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { SvgProps } from "react-native-svg";

type Props = {
  backgroundColor?: string;
  text: string;
  Icon?: React.FC<SvgProps>;
  onPress: () => void;
  textColor?: string;
  customStyle?: ViewStyle;
};

const Button = ({
  backgroundColor,
  text,
  Icon,
  onPress,
  textColor,
  customStyle,
}: Props) => {
  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
          paddingVertical: 15,
          backgroundColor: backgroundColor || "#6F4E37",
          borderRadius: 50,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      {Icon ? <Icon /> : null}
      <Text
        style={[styles.btnText, { color: textColor || Colors.secondaryBG }]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
