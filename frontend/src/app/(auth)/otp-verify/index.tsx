import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import FloatingBackButton from "@/components/FloatingBackButton";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";
import OtpInput from "@/components/OtpInput";

type Props = {};

const OTPScreen = (props: Props) => {
  const [otp, setOtp] = useState("");
  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const { width } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <View style={[styles.container]}>
        <FloatingBackButton />
        <PageHeading heading="OTP Verification" />
        <PageDescription
          description={`Please Check Your Email To See The \n Verification Code.`}
        />
        <View style={{ width, paddingHorizontal: 25 }}>
          <OtpInput onChange={handleChange} />
          <Button
            text="Verify"
            textColor="#fcfcfc"
            backgroundColor={Colors.secondaryBG}
            onPress={() => {}}
            customStyle={{ borderRadius: 15 }}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend code to</Text>
            <Text style={styles.timer}>
              {String(30).padStart(2, "0")}:{String(0).padStart(2, "0")}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  verifyButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: "#666",
  },
});
