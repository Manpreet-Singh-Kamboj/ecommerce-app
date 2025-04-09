import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import Input from "@/components/Input";
import Button from "@/components/Button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { router } from "expo-router";
import PageHeading from "../_components/PageHeading";
import PageDescription from "../_components/PageDescription";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

const SignInPage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(true);
  const handleChange = (text: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  const { width } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <PageHeading heading="Hello Again!" />
      <PageDescription
        description={`Fill your details or continue with \n Khareedo App !`}
      />
      <View style={{ width, gap: 20 }}>
        <Input
          inputHeading="Email Address"
          value={formData.email}
          placeholder="johndoe@gmail.com"
          name="email"
          onChange={handleChange}
        />
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
          <Pressable
            style={styles.forgotPassword}
            onPress={() => router.navigate("forgot-password")}
          >
            <Text
              style={{
                color: Colors.textMuted,
                textDecorationLine: "underline",
              }}
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Button
          text="Sign In"
          onPress={() => {router.navigate("(root)/location-request")}}
          customStyle={{
            marginTop: 35,
            marginHorizontal: 25,
            borderRadius: 14,
          }}
          textColor="#fff"
          backgroundColor={Colors.secondaryBG}
        />
        <Button
          text="Sign In With Google"
          onPress={() => {}}
          Icon={GoogleIcon}
          customStyle={{
            marginHorizontal: 25,
            borderRadius: 14,
            borderWidth: 0.2,
          }}
          textColor="#2b2b2b"
          backgroundColor={Colors.inputBG}
        />
      </View>
      <Pressable
        style={styles.createAccountContainer}
        onPress={() => router.replace("(auth)/sign-up")}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16.5,
            color: Colors.textMuted,
          }}
        >
          New User?
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16.5,
            fontWeight: "600",
            color: Colors.textMuted,
          }}
        >
          Create Account
        </Text>
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  forgotPassword: {
    position: "absolute",
    bottom: -32,
    right: 20,
  },
  createAccountContainer: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
