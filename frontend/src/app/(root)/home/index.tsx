import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Home/header";
import { bannerData } from "@/constants/banner-data";
import PaginationDots from "@/components/PaginationDots";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import Brands from "@/components/Home/brands";
import ProductCard from "@/components/Home/product-card";
import { productData } from "@/constants/product-data";
import SearchBar from "@/components/SearchBar";
import FilterIcon from "@/components/icons/FilterIcon";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (scrollEvent) => {
      scrollX.value = scrollEvent.contentOffset.x;
    },
  });
  const onViewRef = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  );

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 60,
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View style={styles.mainContent}>
          <View style={styles.searchContainer}>
            <Pressable
              style={styles.searchInputContainer}
              onPress={() => router.push("/search")}
            >
              <AntDesign name="search1" size={24} color="black" />
              <Text style={styles.placeholderText}>Search</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/filters")}>
              <FilterIcon />
            </Pressable>
          </View>
          <View style={{ gap: 20 }}>
            <Animated.FlatList
              onScroll={onScrollHandler}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              getItemLayout={(_, index) => ({
                length: width - 55,
                offset: width * index,
                index,
              })}
              style={{ paddingTop: 30 }}
              contentContainerStyle={{ gap: 15 }}
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
                      <Text style={{ color: "white" }}>{item.buttonText}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Right Image Section */}
                  <Image
                    source={item.imageUrl}
                    style={{
                      position: "absolute",
                      right: -25,
                      // top: -50,
                      bottom: -10,
                      width: "80%",
                      height: 180,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              )}
            />
            <PaginationDots
              itemsList={bannerData}
              currentIndex={currentIndex}
              scrollX={scrollX}
              activeDotColor={Colors.secondaryBG}
              inactiveDotColor={Colors.homeInactivePagination}
            />
          </View>
          <Brands />
          <View style={styles.productsGrid}>
            {productData.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  name={item.name}
                  price={item.price}
                  image={require("@assets/images/Yellow Shoe.png")}
                  onPress={() => {}}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 95,
  },
  mainContent: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 15,
  },
  searchInputContainer: {
    flexDirection: "row",
    gap: 7.5,
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
    flex: 1,
  },
  placeholderText: {
    flex: 1,
    color: "#757575",
    fontSize: 16,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    marginBottom: 20,
  },
});
