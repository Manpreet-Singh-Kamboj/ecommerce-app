import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/colors";

type Props = {
  otpLength?: number;
  onChange: (otp: string) => void;
};

const OtpInput = ({ otpLength = 4, onChange }: Props) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>(
    new Array(otpLength).fill(null)
  );
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));
    if (value !== "" && index < otpLength) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      index > 0 &&
      index < otpLength &&
      otp[index] === ""
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpSection}>
      <Text style={styles.otpLabel}>OTP Code</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpSection: {
    marginBottom: 40,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: Colors.inputBG,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
