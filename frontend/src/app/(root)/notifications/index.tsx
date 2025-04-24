import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const NotificationsScreen = (props: Props) => {
  return (
    <View style={styles.container}>
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
