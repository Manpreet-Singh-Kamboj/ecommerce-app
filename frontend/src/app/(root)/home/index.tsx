import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./_components/header";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <>
            <Header />
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <Text>HomeScreen</Text>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
