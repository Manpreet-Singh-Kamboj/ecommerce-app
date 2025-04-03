import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

const GridLayout = () => {
  const { height } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {
          height: (50 / 100) * height,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: "https://static.nbastore.in/resized/500X500/777/jordan-stay-loyal-3-sneakers-whiteblackgym-red-white-67a856910713f.png",
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 100,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: "50%",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{
            uri: "https://5.imimg.com/data5/ANDROID/Default/2023/7/324375987/II/RN/AH/139842122/product-jpeg-500x500.jpg",
          }}
          style={{
            width: "100%",
            height: "58%",
            objectFit: "cover",
            borderRadius: 100,
          }}
        />
        <Image
          source={{
            uri: "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/q/r/x/-original-imah25hqwxshzng5.jpeg?q=90&crop=false",
          }}
          style={{
            width: "100%",
            height: "40%",
            objectFit: "cover",
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
};

export default GridLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
});
