import { LocationContext } from "@/context/LocationContext";
import { useDebounce } from "@/hooks/useDebounce";
import { LocationObjectCoords } from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import "react-native-get-random-values";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";

export default function LocationHeader() {
  const [query, setQuery] = useState("");
  const { setLocation } = useContext(LocationContext);
  const [suggestions, setSuggestions] = useState<any>([]);
  const debouncedQuery = useDebounce(query, 500);
  const fetchSuggestions = async () => {
    if (debouncedQuery.length) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedQuery}`,
          {
            headers: {
              "User-Agent": "Sneaker App",
            },
          }
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, [debouncedQuery]);
  const handlePlaceSelect = (place: any) => {
    const coords = {
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
    };
    setLocation(coords as LocationObjectCoords);
    setSuggestions([]);
    setQuery(place.display_name);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
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
          marginTop: 2.5,
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
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place"
          value={query}
          onChangeText={setQuery}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item?.place_id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handlePlaceSelect(item)}>
                <Text style={styles.suggestionText}>{item.display_name}</Text>
              </Pressable>
            )}
            contentContainerStyle={{
              maxHeight: 150,
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "85%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
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
