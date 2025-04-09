import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import LocationIcon from "@/components/icons/LocationIcon";
import { Colors } from "@/constants/colors";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";

type Props = {};

const LocationRequest = (props: Props) => {
  return (
    <SafeAreaWrapper>
      <View
        style={{
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
      </View>
    </SafeAreaWrapper>
  );
};

export default LocationRequest;

const styles = StyleSheet.create({});
