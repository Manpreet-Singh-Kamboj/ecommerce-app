import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type Props = {
  heading: string;
};

const PageHeading = ({ heading }: Props) => {
  return <Text style={styles.headingText}>{heading}</Text>;
};

export default PageHeading;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 32,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginBottom: 10,
  },
});
