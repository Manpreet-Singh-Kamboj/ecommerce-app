import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridLayout from "./_components/GridLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f8f8f8" }}>
      <ScrollView
        style={{
          paddingHorizontal: 25,
          paddingVertical: 50,
          backgroundColor: "#f8f8f8",
        }}
        showsVerticalScrollIndicator={false}
      >
        <GridLayout />
        <View style={{ gap: 20, paddingTop: 50 }}>
          <Text style={[styles.mainText]}>
            The <Text style={[styles.innerText]}>Sneaker App</Text> That {`\n`}
            Makes You Look The Best
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "#4B4C53",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur {`\n`} adipiscing elit, sed
            do eiusmod tempor incididunt
          </Text>
          <Button
            text="Let' Get Started"
            onPress={() => {
              router.navigate("onboarding");
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: "#75757B",
              fontWeight: "500",
              paddingBottom: 80,
            }}
          >
            Already have an account?
            <Text
              style={{
                color: "#9C8676",
                fontWeight: "600",
              }}
            >
              &nbsp;Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainText: {
    fontSize: 26.2,
    color: "#4B4C53",
    textAlign: "center",
    fontWeight: "600",
  },
  innerText: {
    color: "#80624E",
    fontWeight: "500",
  },
});
