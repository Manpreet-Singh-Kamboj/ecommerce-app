import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type Props = {
  description: string;
};

const PageDescription = ({ description }: Props) => {
  return <Text style={styles.descriptionText}>{description}</Text>;
};

export default PageDescription;

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 18,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: 12.5,
  },
});
