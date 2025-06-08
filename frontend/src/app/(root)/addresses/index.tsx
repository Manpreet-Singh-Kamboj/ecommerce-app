import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import ScreensHeader from "@/components/ScreensHeader";
import { addresses } from "@/constants/addresses";
import { Address } from "@/types";
import AddressCard from "@/components/Addresses/AddressCard";
import { Colors } from "@/constants/colors";

const AddressesScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: Colors.primaryBG,
          },
          header: () => (
            <ScreensHeader
              screenName="Your Addresses"
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              onLeftIconPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            />
          ),
          headerShown: true,
        }}
      />
      <FlatList
        data={addresses}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item: Address) => item._id}
        renderItem={({ item }) => <AddressCard address={item} />}
        scrollEnabled
      />
    </View>
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    marginTop: 10,
    gap: 15,
  },
});
