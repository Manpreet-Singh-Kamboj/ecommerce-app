import Color from "color";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: width > 395 ? 30 : 20,
    paddingTop: width > 395 ? 150 : 110,
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: 30,
  },
  title: {
    fontSize: width > 395 ? 38 : 34,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: width > 395 ? 18 : 16,
    color: "white",
    textAlign: "center",
    fontFamily: "SFProDisplay-Regular",
  },
});

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}

const Slide = ({
  slide: { picture, color, title, description },
}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString();
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <Pressable
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            backgroundColor: "#fff",
            padding: 5,
            borderRadius: 20,
            zIndex: 100,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign name="arrowleft" size={30} color="#526B76" />
        </Pressable>
        <Image source={picture as ImageSourcePropType} style={styles.image} />
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </>
  );
};

export default Slide;
