import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";
import React from "react";
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
  containerStyle?: ViewStyle;
  inactiveDotColor?: string;
  activeDotColor?: string;
};

const PaginationDots = ({
  itemsList,
  currentIndex,
  scrollX,
  containerStyle,
  activeDotColor = Colors.paginationActive,
  inactiveDotColor = Colors.paginationInactive,
}: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignSelf: "center",
          gap: 10,
        },
        containerStyle,
      ]}
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
                  currentIndex === index ? activeDotColor : inactiveDotColor,
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
