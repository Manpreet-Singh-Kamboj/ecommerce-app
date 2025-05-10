import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import SelectedCategoryHeader from "@/components/SelectedCategory/header";

type Props = {};

const SelectedCategoryPage = (props: Props) => {
  const { headerTitle } = useLocalSearchParams<{ headerTitle: string }>();
  return (
    <ScrollView>
      <Stack.Screen
        name="/[category]"
        options={{
          headerShown: true,
          header: () => <SelectedCategoryHeader headerTitle={headerTitle} />,
        }}
      />
    </ScrollView>
  );
};

export default SelectedCategoryPage;

const styles = StyleSheet.create({});
