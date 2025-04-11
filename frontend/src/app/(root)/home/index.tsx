import { StyleSheet, TextInput, View, FlatList, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Home/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import FilterIcon from "@/components/icons/FilterIcon";
import { bannerData } from "@/constants/banner-data";

type Props = {};

const HomeScreen = (props: Props) => {
  const {width} = useWindowDimensions()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <>
            <Header />
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 7.5,
                    alignItems: "center",
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 50,
                    flex: 1,
                  }}
                >
                  <AntDesign name="search1" size={24} color="black" />
                  <TextInput
                    placeholder="Search"
                    style={{ flex: 1, paddingVertical: 4, maxHeight: 50 }}
                  />
                </View>
                <FilterIcon />
              </View>

              <FlatList
                style={{ paddingTop: 30}}
                contentContainerStyle={{gap:15}}
                data={bannerData}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      position: "relative",
                      backgroundColor: "#E3E3E3",
                      width: width - 55,
                      height: 160,
                      borderRadius: 18,
                      marginRight: 16,
                      padding: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* Left Text Section */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {item.heading}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#555",
                          marginBottom: 10,
                        }}
                      >
                        {item.subheading}
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "black",
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 20,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          {item.buttonText}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Right Image Section */}
                    <Image
                      source={item.imageUrl}
                      style={{
                        position: "absolute",
                        right: -25,
                        // top: -50,
                        bottom: -30,
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                )}
              />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
