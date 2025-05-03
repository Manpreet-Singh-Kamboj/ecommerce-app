import { ImageProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { Image } from "expo-image";

type Props = { brandName: string; imgPath: string };

const BrandItems = ({ brandName, imgPath }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={imgPath as ImageProps}
          style={styles.logoImage}
          contentFit="contain"
        />
      </View>
      <Text style={styles.brandText}>{brandName}</Text>
    </View>
  );
};

export default BrandItems;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    alignItems: "center",
    gap: 10,
  },
  logoContainer: {
    backgroundColor: "#E0E0E0",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  brandText: {
    textAlign: "center",
    color: Colors.textMuted,
  },
});
