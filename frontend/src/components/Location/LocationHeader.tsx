import { LocationContext } from "@/context/LocationContext";
import { LocationObjectCoords } from "expo-location";
import React, { useContext } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { View, StyleSheet, Pressable } from "react-native";
import "react-native-get-random-values";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import ErrorToast from "../Toasts/error-toast";

export default function LocationHeader() {
  const { setLocation } = useContext(LocationContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Pressable
        style={{
          backgroundColor: Colors.inputBG,
          padding: 10,
          borderRadius: 30,
          borderWidth: 0.2,
          width: 45,
          height: 45,
          maxWidth: 45,
          maxHeight: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      >
        <Entypo name="chevron-left" size={24} color="black" />
      </Pressable>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for your nearest location"
          styles={{
            container: {
              backgroundColor: "transparent",
              zIndex: 100,
              gap: 5,
            },
            textInputContainer: {
              backgroundColor: "transparent",
              borderRadius: 100,
            },
            textInput: {
              backgroundColor: Colors.primaryBG,
              borderRadius: 100,
              fontSize: 16,
              paddingHorizontal: 15,
              overflow: "hidden",
            },
            listView: {
              backgroundColor: Colors.primaryBG,
              borderRadius: 22.5,
            },
            row: {
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#f0f0f0",
            },
          }}
          fetchDetails
          enablePoweredByContainer={false}
          onPress={(_, details = null) => {
            setLocation({
              latitude: details?.geometry.location.lat || 0,
              longitude: details?.geometry.location.lng || 0,
            } as LocationObjectCoords);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "",
            language: "en",
          }}
          listViewDisplayed="auto"
          onFail={(error) => {
            console.log("Autocomplete error:", error);
            ErrorToast({
              message: "Internal Server Error. Please try again later.",
            });
          }}
          onNotFound={() =>
            ErrorToast({
              message:
                "Sorry, we couldn't find any locations matching your search. Please try again with a different address.",
            })
          }
          debounce={400}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "85%",
    alignSelf: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "#000",
    maxHeight: 45,
  },
  suggestionText: {
    padding: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
