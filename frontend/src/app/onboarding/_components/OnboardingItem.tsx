import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

type Props = {
  title: string;
  description: string;
  imgPath: string;
};

const OnboardingItem = ({ title, description, imgPath }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ width, height, backgroundColor: "#F8F8F8" }}>
      <Image
        source={imgPath}
        style={{
          width: "100%",
          height: "60%",
        }}
      />
      <View
        style={{
          height: "40%",
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 25,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(0,0,0,0.5)",
              fontSize: 16,
              letterSpacing: 0.2,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({});
