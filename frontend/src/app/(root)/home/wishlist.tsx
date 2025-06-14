import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { wishlistData } from "@/constants/wishlist-data";
import WishlistCard from "@/components/Wishlist/wishlistCard";

type Props = {};

const wishlist = (props: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wishlistData.map((item, index) => {
        return (
          <WishlistCard
            key={index}
            name={item.name}
            image={item.image}
            price={item.price}
            colors={item.colors}
          />
        );
      })}
    </ScrollView>
  );
};

export default wishlist;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 0,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 115,
  },
});
