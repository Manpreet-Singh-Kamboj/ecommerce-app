import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

type Props = {
  name: string;
  price: number;
  image: ImageSourcePropType;
  onPress?: () => void;
};

const ProductCard = ({ name, price, image, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} contentFit="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <View style={styles.arrowContainer}>
            <AntDesign name="arrowright" size={17} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "47%",
    height: 270,
    marginHorizontal: "1.5%",
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  imageContainer: {
    height: "75%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 10,
    height: "18%",
    marginBottom: 10,
  },
  name: {
    fontSize: 16.5,
    fontWeight: "700",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  arrowContainer: {
    backgroundColor: "#fff",
    paddingVertical: 3.5,
    paddingHorizontal: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(55, 73, 87, 0.30)",
  },
  price: {
    fontSize: 15,
    fontWeight: "500",
  },
});
