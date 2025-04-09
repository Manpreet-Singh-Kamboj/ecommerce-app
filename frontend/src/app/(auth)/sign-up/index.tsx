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
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";

const SignUpPage = () => {
  const [formData, setFormData] = React.useState({
    name: "",
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
      <PageHeading heading="Register Account" />
      <PageDescription
        description={`Fill your details or continue with \n Khareedo App !`}
      />
      <View style={{ width, gap: 20 }}>
        <Input
          inputHeading="Your Name"
          value={formData.name}
          placeholder="John Doe"
          name="name"
          onChange={handleChange}
        />
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
        </View>
        <Button
          text="Sign Up"
          onPress={() => {}}
          customStyle={{
            marginTop: 35,
            marginHorizontal: 25,
            borderRadius: 14,
          }}
          textColor="#fff"
          backgroundColor={Colors.secondaryBG}
        />
        <Button
          text="Sign Up With Google"
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
        style={styles.alreadyHaveAnAccountContainer}
        onPress={() => router.replace("(auth)/sign-in")}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16.5,
            color: Colors.textMuted,
          }}
        >
          Already Have an Account?
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16.5,
            fontWeight: "600",
            color: Colors.textMuted,
          }}
        >
          Log In
        </Text>
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default SignUpPage;

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
