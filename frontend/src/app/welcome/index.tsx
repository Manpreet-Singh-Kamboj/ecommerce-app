import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import WelcomeScene from "./_components/WelcomeScene";

const index = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.secondaryBG }}>
      <ScrollView
        style={{
          paddingHorizontal: 25,
          paddingVertical: 50,
          backgroundColor: Colors.secondaryBG,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeScene />
        <View style={{ gap: 20, paddingTop: 50 }}>
          <Text style={[styles.mainText]}>
            The <Text style={[styles.innerText]}>Sneaker App</Text> That {`\n`}
            Makes You Look The Best
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: Colors.primaryBG,
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
            customStyle={{
              backgroundColor: Colors.primaryBG,
            }}
            textColor={Colors.secondaryBG}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              color: Colors.primaryBG,
              fontWeight: "500",
              paddingBottom: 80,
            }}
          >
            Already have an account?
            <Text
              style={{
                color: "#40bced",
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
    color: Colors.primaryBG,
    textAlign: "center",
    fontWeight: "600",
  },
  innerText: {
    color: "#40bced",
    fontWeight: "bold",
  },
});
