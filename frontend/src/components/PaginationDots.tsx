import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Extrapolation,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "@/constants/colors";

type Props = {
  itemsList: any[];
  currentIndex: number;
  scrollX: SharedValue<number>;
};

const PaginationDots = ({ itemsList, currentIndex, scrollX }: Props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        position: "absolute",
        bottom: width > 400 ? insets.bottom + 120 : insets.bottom + 90,
        flexDirection: "row",
        alignSelf: "center",
        gap: 10,
      }}
    >
      {itemsList.map((_, index) => {
        const paginationDotsAnimatedStyle = useAnimatedStyle(() => {
          return {
            width: interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [20, 30, 20],
              Extrapolation.CLAMP
            ),
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              {
                height: 5,
                backgroundColor:
                  currentIndex === index
                    ? Colors.paginationActive
                    : Colors.paginationInactive,
                borderRadius: 7.5,
              },
              paginationDotsAnimatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({});
