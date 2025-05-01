import { useWindowDimensions, View } from "react-native";
import React from "react";
import { Redirect, router, Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeIcon from "@/components/icons/Home/HomeIcon";
import BagIcon from "@/components/icons/Home/BagIcon";
import WishlistIcon from "@/components/icons/Home/WishlistIcon";
import ChatIcon from "@/components/icons/Home/ChatIcon";
import ProfileIcon from "@/components/icons/Home/ProfileIcon";
import ScreensHeader from "@/components/ScreensHeader";
import CartIcon from "@/components/icons/Wishlist/CartIcon";
import Feather from "@expo/vector-icons/Feather";
import useAuth from "@/hooks/useAuth";

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
  return (
    <View
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
      ]}
    >
      <TabBarIcon focused={focused} routeName={routeName} />
    </View>
  );
};

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { token } = useAuth();
  if (!token) return <Redirect href={"/(onboarding)/welcome"} />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          marginHorizontal: width > 400 ? 30 : 15,
          marginBottom:
            insets.bottom > 0 ? insets.bottom - 10 : insets.bottom + 15,
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
          headerShown: true,
          header: () => (
            <ScreensHeader
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              screenName="My Orders"
              rightIcon={<CartIcon />}
              onLeftIconPress={() => router.navigate("/home")}
              onRightIconPress={() => {}}
            />
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
          headerShown: true,
          header: () => (
            <ScreensHeader
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              screenName="Wishlist"
              rightIcon={<CartIcon />}
              onLeftIconPress={() => router.navigate("/home")}
              onRightIconPress={() => {}}
            />
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
          headerShown: true,
          header: () => (
            <ScreensHeader
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              screenName="Support"
              rightIcon={
                <ChatIcon
                  focused={true}
                  activeColor={Colors.secondaryBG}
                  inActiveColor={Colors.primaryBG}
                />
              }
              onLeftIconPress={() => router.navigate("/home")}
              onRightIconPress={() => {}}
            />
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
          headerShown: true,
          header: () => (
            <ScreensHeader
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              screenName="Profile"
              rightIcon={
                <ProfileIcon
                  focused={true}
                  activeColor={Colors.secondaryBG}
                  inActiveColor={Colors.primaryBG}
                />
              }
              onLeftIconPress={() => router.navigate("/home")}
              onRightIconPress={() => {}}
            />
          ),
        }}
      />
    </Tabs>
  );
}
