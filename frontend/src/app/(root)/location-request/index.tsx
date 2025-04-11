import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import LocationIcon from "@/components/icons/LocationIcon";
import { Colors } from "@/constants/colors";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";
import Button from "@/components/Button";
import { router } from "expo-router";

const LocationRequest = () => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <View
        style={{
          width,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          gap: 40,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.inputBG,
            padding: 20,
            borderRadius: 50,
          }}
        >
          <LocationIcon />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <PageHeading heading="What is Your Location?" fontWeight={"600"} />
          <PageDescription
            description={`We need to know your location in order to suggest \n nearby services.`}
          />
        </View>
        <View style={{ width, gap: 20 }}>
          <Button
            text="Allow Location Access"
            onPress={() => router.navigate("home")}
            customStyle={{
              marginHorizontal: 25,
              borderRadius: 25,
            }}
            textColor="#fff"
            backgroundColor={Colors.secondaryBG}
          />
          <Button
            text="Enter Location Manually"
            onPress={() => {}}
            customStyle={{
              marginHorizontal: 25,
              borderRadius: 25,
            }}
            textColor={Colors.secondaryBG}
            backgroundColor={Colors.primaryBG}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default LocationRequest;

const styles = StyleSheet.create({});
