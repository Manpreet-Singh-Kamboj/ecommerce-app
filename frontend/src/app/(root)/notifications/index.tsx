import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import ScreensHeader from "@/components/ScreensHeader";
import { Feather } from "@expo/vector-icons";

type Props = {};

const NotificationsScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        name="(root)/notifications/index"
        options={{
          headerShown: true,
          header: () => (
            <ScreensHeader
              leftIcon={<Feather name="chevron-left" size={24} color="black" />}
              screenName="Notifications"
              onLeftIconPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            />
          ),
        }}
      />
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text>Notifications Screen</Text>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 20,
    position: "relative",
  },
});
