import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type Props = {
  heading: string;
  fontWeight?: TextStyle["fontWeight"];
};

const PageHeading = ({ heading, fontWeight }: Props) => {
  return (
    <Text style={[styles.headingText, { fontWeight: fontWeight || "700" }]}>
      {heading}
    </Text>
  );
};

export default PageHeading;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 32,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
});
