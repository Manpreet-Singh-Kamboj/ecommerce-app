import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { useAppDispatch } from "@/redux/store/hooks";
import { logout } from "@/services/auth";

type Props = {};

const profile = (props: Props) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={{ marginTop: 30, paddingHorizontal: 15 }}>
      <Button
        text="Logout"
        onPress={handleLogout}
        textColor={Colors.primaryBG}
        backgroundColor={Colors.secondaryBG}
      />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
