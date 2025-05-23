import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Address } from "@/types";
import { Colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";

type AddressCardProps = {
  address: Address;
};

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <Pressable style={styles.card}>
      <View style={styles.addressContainer}>
        <Text style={styles.fullName}>{address.fullName}</Text>
        <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
        <Text style={styles.addressLine1}>{address.addressLine1}</Text>
        {address.addressLine2 ? (
          <Text style={styles.addressLine2}>{address.addressLine2}</Text>
        ) : null}
        <Text style={styles.addressLine1}>
          {address.city}, {address.state}, {address.postalCode}
        </Text>
      </View>
      <Text style={styles.label}>{address.label}</Text>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.edit}>
          <Feather name="edit" size={20} color={Colors.primaryBG} />
        </Pressable>
        <Pressable style={styles.trash}>
          <Feather name="trash-2" size={20} color={Colors.primaryBG} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: Colors.grayBg,
    borderRadius: 20,

    position: "relative",
  },
  addressContainer: {
    gap: 5,
    maxWidth: "75%",
  },
  fullName: {
    fontSize: 16.5,
    fontWeight: "600",
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.textMuted,
  },
  addressLine1: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.textPrimary,
  },
  addressLine2: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primaryBG,
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: Colors.secondaryBG,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7.5,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    flexDirection: "row",
    gap: 7.5,
  },
  edit: {
    backgroundColor: Colors.secondaryBG,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 7.5,
  },
  trash: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 7.5,
  },
});
