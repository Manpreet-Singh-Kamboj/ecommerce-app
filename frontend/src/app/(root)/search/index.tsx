import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { productData } from "@/constants/product-data";
import ProductCard from "@/components/Home/product-card";
import index from "@/app/(onboarding)/welcome";

type Props = {};

export default function SearchScreen(props: Props) {
  return (
    <View style={styles.container}>
      <View style={{ height: 45 }}>
        <SearchBar />
      </View>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {productData.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 20,
    position: "relative",
  },
});
