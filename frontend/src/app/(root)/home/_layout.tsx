import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeIcon from "@/components/icons/Home/HomeIcon";
import BagIcon from "@/components/icons/Home/BagIcon";
import WishlistIcon from "@/components/icons/Home/WishlistIcon";
import ChatIcon from "@/components/icons/Home/ChatIcon";
import ProfileIcon from "@/components/icons/Home/ProfileIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TabBarIconProps = {
  focused: boolean;
  routeName: "home" | "bag" | "chat" | "profile" | "wishlist";
};

const TabBarIcon = ({ focused, routeName }: TabBarIconProps) => {
  switch (routeName) {
    case "home":
      return (
        <HomeIcon
          focused={focused}
          activeColor={Colors.secondaryBG}
          inActiveColor={Colors.primaryBG}
        />
      );
    case "bag":
      return (
        <BagIcon
          focused={focused}
          activeColor={Colors.secondaryBG}
          inActiveColor={Colors.primaryBG}
        />
      );
    case "wishlist":
      return (
        <WishlistIcon
          focused={focused}
          activeColor={Colors.secondaryBG}
          inActiveColor={Colors.primaryBG}
        />
      );
    case "chat":
      return (
        <ChatIcon
          focused={focused}
          activeColor={Colors.secondaryBG}
          inActiveColor={Colors.primaryBG}
        />
      );
    case "profile":
      return (
        <ProfileIcon
          focused={focused}
          activeColor={Colors.secondaryBG}
          inActiveColor={Colors.primaryBG}
        />
      );
  }
};

type TabBarItemProps = {
  focused: boolean;
  routeName: "home" | "bag" | "chat" | "profile" | "wishlist";
};

const TabBarItem = ({ focused, routeName }: TabBarItemProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 1.2, {
      damping: 8,
      stiffness: 150,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          borderRadius: 50,
          backgroundColor: focused ? Colors.primaryBG : Colors.secondaryBG,
          paddingHorizontal: 30,
          paddingVertical: 30,
          width: 55,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <TabBarIcon focused={focused} routeName={routeName} />
    </Animated.View>
  );
};

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginHorizontal: width > 400 ? 30 : 15,
          marginBottom:
            Platform.OS === "android"
              ? insets.bottom + 15
              : width > 400
              ? insets.bottom - 10
              : insets.bottom + 10,
          height: 80,
          backgroundColor: Colors.secondaryBG,
          borderRadius: 50,
          elevation: 0,
        },
        tabBarItemStyle: {
          bottom: -20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarItem focused={focused} routeName="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          tabBarIcon: ({ focused }) => (
            <TabBarItem focused={focused} routeName="bag" />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ focused }) => (
            <TabBarItem focused={focused} routeName="wishlist" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabBarItem focused={focused} routeName="chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarItem focused={focused} routeName="profile" />
          ),
        }}
      />
    </Tabs>
  );
}
