import React, { useState } from "react";
import Slider from "./_components/Slider";
import Slide from "./_components/Slide";
import { onboardingData } from "@/constants/onboardingData";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
export const assets = onboardingData.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = onboardingData[index - 1];
  const next = onboardingData[index + 1];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={prev && <Slide slide={prev} />}
        next={next && <Slide slide={next} />}
      >
        <Slide slide={onboardingData[index]!} />
      </Slider>
    </GestureHandlerRootView>
  );
};

export default LiquidSwipe;
