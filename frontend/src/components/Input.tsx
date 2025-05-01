import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  inputHeading?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (text: string, name: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
  isPassword?: boolean;
};

const Input = ({
  inputHeading,
  name,
  placeholder,
  value,
  onChange,
  secureTextEntry,
  showPassword,
  setShowPassword,
  isPassword = false,
}: Props) => {
  return (
    <View style={styles.container}>
      {inputHeading && <Text style={styles.inputHeading}>{inputHeading}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text: string) => onChange(text, name)}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        autoCapitalize="none"
      />
      {isPassword ? (
        <Pressable
          style={styles.showPasswordIcon}
          onPress={() => setShowPassword?.(!showPassword)}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 25,
    position: "relative",
  },
  inputHeading: {
    fontSize: 18,
    fontWeight: "medium",
    marginBottom: 10,
    lineHeight: 20,
  },
  input: {
    display: "flex",
    width: "100%",
    backgroundColor: Colors.inputBG,
    padding: 15,
    borderRadius: 14,
    borderWidth: 0.2,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 40,
    top: "50%",
    transform: [{ translateY: 3 }],
    zIndex: 1,
  },
});
