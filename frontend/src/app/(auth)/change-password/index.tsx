import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { useAppDispatch } from "@/redux/store/hooks";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import ErrorToast from "@/components/Toasts/error-toast";
import { forgotPassword } from "@/services/auth";

type Props = {};

const ChangePasswordScreen = (props: Props) => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();
  const { loading, forgotPasswordData } = useAuth();
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);
  const handleChange = (text: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleResetPassword = () => {
    if (!formData.password || !formData.confirmPassword) {
      ErrorToast({
        message: "Password/Confirm Password are required.",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      ErrorToast({
        message: "Password and Confirm Password does not match.",
      });
      return;
    }
    const { email, token } = forgotPasswordData;
    dispatch(
      forgotPassword({
        email,
        token,
        password: formData.password,
        router,
      })
    );
  };

  const { width } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <View style={{ width, gap: 20 }}>
        <View
          style={{
            position: "relative",
          }}
        >
          <Input
            inputHeading="Password"
            placeholder="********"
            value={formData.password}
            name="password"
            onChange={handleChange}
            secureTextEntry={showPassword}
            isPassword={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </View>
        <View
          style={{
            position: "relative",
          }}
        >
          <Input
            inputHeading="Confirm Password"
            placeholder="********"
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            secureTextEntry={showConfirmPassword}
            isPassword={true}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
        </View>
        <Button
          text={
            loading ? <ActivityIndicator color={"#fff"} /> : "Reset Password"
          }
          disabled={loading}
          onPress={handleResetPassword}
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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  alreadyHaveAnAccountContainer: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
