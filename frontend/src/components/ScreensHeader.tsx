import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

type Props = {
  leftIcon?: React.ReactNode;
  screenName: string;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

export default function ScreensHeader({
  leftIcon,
  screenName,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: insets.top === 0 ? 15 : insets.top + 5,
        marginBottom: 10,
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {leftIcon ? (
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            padding: 2,
            borderWidth: 1,
            borderRadius: 10,
          }}
          onPress={onLeftIconPress}
        >
          {leftIcon}
        </Pressable>
      ) : null}
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {screenName}
      </Text>
      {rightIcon ? (
        <Pressable
          onPress={onRightIconPress}
          style={{ position: "absolute", right: 20 }}
        >
          {rightIcon}
        </Pressable>
      ) : null}
    </View>
  );
}
