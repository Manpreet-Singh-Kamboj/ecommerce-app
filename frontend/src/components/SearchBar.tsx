import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import FilterIcon from "./icons/FilterIcon";

type Props = {};

const SearchBar = () => {
  return (
    <View style={styles.searchInputContainer}>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput placeholder="Search" style={styles.searchInput} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    gap: 7.5,
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    maxHeight: 50,
  },
});
