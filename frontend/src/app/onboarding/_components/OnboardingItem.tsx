import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { ImageBackground } from "expo-image";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
  title: string;
  description?: string;
  imgPath: string;
};

const OnboardingItem = ({ title, description, imgPath }: Props) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#231F20",
        width,
        height,
      }}
    >
      <ScrollView>
        <ImageBackground
          source={imgPath}
          style={{
            width,
            height: height - (insets.top + insets.bottom),
          }}
          contentFit="contain"
        >
          <View
            style={{
              width,
              height,
              justifyContent: "center",
              alignItems: "center",
              marginTop: width > 395 ? 130 : 120,
              paddingHorizontal: 36,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: width > 400 ? 40 : 33,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: "#D8D8D8",
                fontSize: 20,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {description}
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {},
});
