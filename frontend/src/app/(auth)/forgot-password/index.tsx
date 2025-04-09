import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import FloatingBackButton from "@/components/FloatingBackButton";
import { router } from "expo-router";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";

type Props = {};

const ForgotPassword = ({}: Props) => {
  const [formData, setFormData] = React.useState({
    email: "",
  });

  const handleChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { width } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <FloatingBackButton />
      <PageHeading heading="Forgot Password" />
      <PageDescription
        description={`Enter your Email account to reset \n your password`}
      />
      <View style={{ width, marginTop: 25 }}>
        <Input
          value={formData.email}
          placeholder="johndoe@gmail.com"
          name="email"
          onChange={handleChange}
        />
        <Button
          text="Reset Password"
          onPress={() => {
            router.navigate("/otp-verify");
          }}
          customStyle={{
            marginTop: 35,
            marginHorizontal: 25,
            borderRadius: 14,
          }}
          textColor="#fff"
          backgroundColor={Colors.secondaryBG}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
