import {
  StyleSheet,
  useWindowDimensions,
  View,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from "react-native";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OnboardingItem from "./_components/OnboardingItem";
import { onboardingData } from "@/constants/onboardingData";
import PaginationDots from "@/components/PaginationDots";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Button from "@/components/Button";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";

const OnboardingPage = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const scrollX = useSharedValue(0);
  const flatlistRef =
    useRef<Animated.FlatList<(typeof onboardingData)[1]>>(null);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (scrollEvent) => {
      scrollX.value = scrollEvent.contentOffset.x;
    },
  });
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs =
    React.useRef([
      {
        viewabilityConfig: {
          itemVisiblePercentThreshold: 50,
        },
        onViewableItemsChanged: ({
          viewableItems,
        }: {
          viewableItems: ViewToken[];
        }) => {
          if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
          }
        },
      },
    ]).current;

  const scrollToIndex = () => {
    if (!flatlistRef.current) return;
    if (currentIndex + 1 < onboardingData.length) {
      flatlistRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.secondaryBG,
        height: "100%",
        width: "100%",
      }}
    >
      <Animated.FlatList
        ref={flatlistRef}
        data={onboardingData}
        renderItem={({ item }) => (
          <OnboardingItem
            title={item.title}
            description={item?.description}
            imgPath={item.imgPath}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.imgPath}
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      />
      <PaginationDots
        currentIndex={currentIndex}
        itemsList={onboardingData}
        scrollX={scrollX}
        containerStyle={{
          position: "absolute",
          bottom: width > 400 ? insets.bottom + 120 : insets.bottom + 90,
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          text="Next"
          onPress={scrollToIndex}
          backgroundColor="#FCFCFC"
          customStyle={{
            position: "absolute",
            bottom: insets.bottom + 20,
            width: "100%",
            borderRadius: 10,
          }}
          textColor="#2B2B2B"
        />
      </View>
    </View>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({});
