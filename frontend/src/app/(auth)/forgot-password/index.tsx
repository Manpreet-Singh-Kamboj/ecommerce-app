import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import FloatingBackButton from "@/components/FloatingBackButton";
import { router } from "expo-router";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";
import useAppDispatch from "@/hooks/useAppDispatch";
import { sendVerificationOtp } from "@/services/auth";
import { setForgotPasswordData } from "@/redux/slices/auth.slice";
import ErrorToast from "@/components/Toasts/error-toast";
import useAuth from "@/hooks/useAuth";

type Props = {};

const ForgotPassword = ({}: Props) => {
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const dispatch = useAppDispatch();
  const { loading } = useAuth();
  const handleChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      ErrorToast({
        message: "Email is required!",
      });
      return;
    }
    dispatch(
      setForgotPasswordData({
        email: formData.email,
      })
    );
    dispatch(
      sendVerificationOtp({
        email: formData.email,
        type: "forgot_password",
        router,
      })
    );
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
          text={
            loading ? <ActivityIndicator color={"#fff"} /> : "Reset Password"
          }
          disabled={loading}
          onPress={handleForgotPassword}
          customStyle={{
            marginTop: 35,
            marginHorizontal: 25,
            borderRadius: 14,
          }}
          textColor="#fff"
          backgroundColor={loading ? Colors.disabledButton : Colors.secondaryBG}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
