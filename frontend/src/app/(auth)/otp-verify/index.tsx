import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import FloatingBackButton from "@/components/FloatingBackButton";
import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import PageHeading from "@/components/PageHeading";
import PageDescription from "@/components/PageDescription";
import OtpInput from "@/components/OtpInput";
import useAppDispatch from "@/hooks/useAppDispatch";
import ErrorToast from "@/components/Toasts/error-toast";
import {
  forgotPassword,
  sendVerificationOtp,
  signUp,
  verifyForgotPasswordOtp,
} from "@/services/auth";
import { router, useLocalSearchParams } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { setForgotPasswordData } from "@/redux/slices/auth.slice";

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [resetOtpTimer, setResetOtpTimer] = useState(30);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const { type } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { signupData, loading, forgotPasswordData } = useAuth();
  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  React.useEffect(() => {
    if (resetOtpTimer === 0) return;
    let resetOtpTimerInterval: NodeJS.Timeout | undefined;
    if (resetOtpTimer > 0) {
      setResendButtonDisabled(true);
      resetOtpTimerInterval = setInterval(() => {
        setResetOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(resetOtpTimerInterval);
      setResendButtonDisabled(false);
    }
    return () => {
      clearInterval(resetOtpTimerInterval);
    };
  }, [resetOtpTimer]);

  const handleResendOtp = () => {
    if (!resendButtonDisabled) return;
    switch (type) {
      case "sign_up":
        const { email: signUpEmail } = signupData;
        dispatch(
          sendVerificationOtp({
            email: signUpEmail,
            type,
            router,
            isResendOtp: true,
          })
        );
        break;
      case "forgot_password":
        const { email: forgotPasswordEmail } = forgotPasswordData;
        dispatch(
          sendVerificationOtp({
            email: forgotPasswordEmail,
            type,
            router,
            isResendOtp: true,
          })
        );
        break;
      default:
        ErrorToast({
          message: "Invalid request.",
        });
        break;
    }
    setResendButtonDisabled(true);
    setResetOtpTimer(30);
  };

  const handleOtpVerifyAndSignup = () => {
    if (otp.trim().length < 4) {
      ErrorToast({
        message: "Please enter a valid 4-digit OTP.",
      });
      return;
    }
    switch (type) {
      case "sign_up":
        const { name, email: signUpEmail, password } = signupData;
        dispatch(signUp({ name, email: signUpEmail, password, otp, router }));
        break;
      case "forgot_password":
        const { email } = forgotPasswordData;
        dispatch(
          setForgotPasswordData({
            email,
            otp,
          })
        );
        dispatch(verifyForgotPasswordOtp({ email, otp, router }));
        break;
      default:
        ErrorToast({
          message: "Invalid request.",
        });
        break;
    }
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
            text={loading ? <ActivityIndicator color={"#fff"} /> : "Verify OTP"}
            disabled={loading}
            textColor="#fcfcfc"
            backgroundColor={
              loading ? Colors.disabledButton : Colors.secondaryBG
            }
            onPress={handleOtpVerifyAndSignup}
            customStyle={{ borderRadius: 15 }}
          />
          {resetOtpTimer > 0 ? (
            <View style={[styles.resendContainer]}>
              <Text style={styles.resendText}>Resend code in</Text>
              <Text style={styles.timer}>{`00:${resetOtpTimer
                .toString()
                .padStart(2, "0")}`}</Text>
            </View>
          ) : (
            <View style={styles.resendButtonContainer}>
              <Pressable onPress={handleResendOtp} style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </Pressable>
            </View>
          )}
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
    marginTop: 30,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: "#666",
  },
  resendButtonContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  resendButton: {
    backgroundColor: Colors.secondaryBG,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  resendButtonText: {
    color: Colors.primaryBG,
    fontSize: 12.5,
    fontWeight: "bold",
  },
});
