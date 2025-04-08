import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import Input from "@/components/Input";
import Button from "@/components/Button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { router } from "expo-router";

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
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text style={styles.headingText}>Hello Again!</Text>
        <Text style={styles.descriptionText}>
          Fill your details or continue with {"\n"} Khareedo App !
        </Text>
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
            <Pressable style={styles.forgotPassword}>
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
              textDecorationLine: "underline",
              color: Colors.textMuted,
            }}
          >
            New User? Create Account
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryBG,
  },
  headingText: {
    fontSize: 32,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: 12.5,
  },
  forgotPassword: {
    position: "absolute",
    bottom: -32,
    right: 20,
  },
  createAccountContainer: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
  },
});
