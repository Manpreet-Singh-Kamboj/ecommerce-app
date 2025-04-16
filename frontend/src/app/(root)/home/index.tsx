import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Home/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import FilterIcon from "@/components/icons/FilterIcon";
import { bannerData } from "@/constants/banner-data";
import PaginationDots from "@/components/PaginationDots";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
