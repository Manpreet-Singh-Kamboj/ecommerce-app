import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/colors";

type Props = { name: string; price: number; image: string; colors: string[] };

const WishlistCard = ({ name, price, image, colors }: Props) => {
  return (
    <View
      style={{
        width: "47.5%",
        backgroundColor: "#fcfcfc",
        borderRadius: 20,
        height: 220,
        marginBottom: 15,
      }}
    >
      <View
        style={{
          height: "67.5%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          source={image}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 20,
            color: Colors.textPrimary,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#000000" }}>
            ${price}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {colors.map((color, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 0.3,
                  borderColor: Colors.secondaryBG,
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                  backgroundColor: color,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistCard;

const styles = StyleSheet.create({});
