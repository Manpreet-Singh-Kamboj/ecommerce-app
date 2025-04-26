import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { productData } from "@/constants/product-data";
import ProductCard from "@/components/Home/product-card";
import { router, Stack } from "expo-router";
import ScreensHeader from "@/components/ScreensHeader";
import { Feather } from "@expo/vector-icons";

type Props = {};

export default function SearchScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Stack.Screen
            name="(root)/search/index"
            options={{
              headerShown: true,
              header: () => (
                <ScreensHeader
                  leftIcon={
                    <Feather name="chevron-left" size={24} color="black" />
                  }
                  screenName="Search"
                  onLeftIconPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    }
                  }}
                />
              ),
            }}
          />
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
