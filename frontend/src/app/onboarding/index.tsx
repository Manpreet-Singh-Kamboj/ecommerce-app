import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OnboardingItem from "./_components/OnboardingItem";
import { onboardingData } from "@/constants/onboardingData";
import PaginationDots from "@/components/PaginationDots";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const OnboardingPage = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (scrollEvent) => {
      scrollX.value = scrollEvent.contentOffset.x;
    },
  });

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
          if (viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
          }
        },
      },
    ]).current;

  return (
    <View
      style={{
        backgroundColor: "#f8f8f8",
        height: "100%",
        width: "100%",
        paddingTop: insets.top,
      }}
    >
      <Animated.FlatList
        data={onboardingData}
        renderItem={({ item }) => (
          <OnboardingItem
            title={item.title}
            description={item.description}
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
      />
    </View>
  );
};

export default OnboardingPage;

const styles = StyleSheet.create({});
