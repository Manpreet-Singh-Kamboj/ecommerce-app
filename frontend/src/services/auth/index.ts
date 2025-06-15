import {
  setForgotPasswordData,
  setIsAuthenticated,
  setLoading,
  setToken,
} from "@/redux/slices/auth.slice";
import { apiConnector } from "../api-connector";
import { authEndpoints } from "../apis";
import Toast from "react-native-toast-message";
import {
  deleteAccessToken,
  deleteRefreshToken,
  storeAccessToken,
  storeRefreshToken,
} from "@/utils/storage";
import { router } from "expo-router";
import axios from "axios";
import { AppDispatch } from "@/redux/store";
import SuccessToast from "@/components/Toasts/success-toast";
import ErrorToast from "@/components/Toasts/error-toast";
import { Alert } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const {
  SIGN_IN,
  SIGN_UP,
  SEND_VERIFICATION_OTP,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP_VERIFY,
} = authEndpoints;

type SignInProps = {
  email: string;
  password: string;
  router: typeof router;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
  otp: string;
  router: typeof router;
};

type SendVerificationOtpProps = {
  email: string;
  type: "forgot_password" | "sign_up";
  router: typeof router;
  isResendOtp?: boolean;
};

type ForgotPasswordProps = {
  email: string;
  password: string;
  token: string;
  router: typeof router;
};

type VerifyForgotPasswordOtpProps = {
  email: string;
  otp: string;
  router: typeof router;
};

export function signIn({ email, password, router }: SignInProps) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await apiConnector({
        method: "POST",
        url: SIGN_IN,
        body: {
          email,
          password,
        },
      });
      if (!data?.success) {
        ErrorToast({ message: data?.message });
        dispatch(setLoading(false));
        return;
      }
      storeAccessToken(data?.accessToken);
      dispatch(setToken(data?.accessToken));
      storeRefreshToken(data?.refreshToken);
      SuccessToast({ message: "Signed in successfully" });
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("(root)/home");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        ErrorToast({ message: error.response?.data?.message || error.message });
      } else {
        ErrorToast({ message: "Something went wrong" });
      }
    }
    dispatch(setLoading(false));
  };
}

export function sendVerificationOtp({
  email,
  type,
  router,
  isResendOtp = false,
}: SendVerificationOtpProps) {
  return async (dispatch: AppDispatch) => {
    if (!isResendOtp) dispatch(setLoading(true));
    try {
      const { data } = await apiConnector({
        method: "POST",
        url: SEND_VERIFICATION_OTP,
        body: {
          email,
          type,
        },
      });
      if (!data?.success) {
        ErrorToast({ message: data?.message });
        dispatch(setLoading(false));
        return;
      }
      SuccessToast({
        message:
          "Verification code sent to your email. Please check your inbox/spam.",
      });
      if (!isResendOtp) {
        router.navigate(`(auth)/otp-verify?type=${type}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorToast({
          message: error?.response?.data?.message || error.message,
        });
      } else {
        ErrorToast({
          message: "Something went wrong.",
        });
      }
    }
    dispatch(setLoading(false));
  };
}

export function verifyForgotPasswordOtp({
  email,
  otp,
  router,
}: VerifyForgotPasswordOtpProps) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await apiConnector({
        method: "POST",
        url: FORGOT_PASSWORD_OTP_VERIFY,
        body: {
          email,
          otp,
        },
      });
      if (!data.success) {
        ErrorToast({ message: data?.message });
        dispatch(setLoading(false));
        return;
      }
      dispatch(
        setForgotPasswordData({
          email,
          token: data?.token,
        })
      );
      SuccessToast({ message: data?.message });
      router.replace("(auth)/change-password");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorToast({
          message: error?.response?.data?.message || error.message,
        });
      } else {
        ErrorToast({
          message: "Something went wrong.",
        });
      }
    }
    dispatch(setLoading(false));
  };
}

export function signUp({ name, email, password, otp, router }: SignUpProps) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await apiConnector({
        method: "POST",
        url: SIGN_UP,
        body: {
          name,
          email,
          password,
          otp,
        },
      });
      if (!data.success) {
        ErrorToast({ message: data?.message });
        dispatch(setLoading(false));
        return;
      }
      SuccessToast({ message: data?.message });
      if (router.canDismiss()) {
        router.dismiss();
        router.replace("(auth)/sign-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorToast({
          message: error?.response?.data?.message || error.message,
        });
      } else {
        ErrorToast({
          message: "Something went wrong.",
        });
      }
    }
    dispatch(setLoading(false));
  };
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      deleteAccessToken();
      deleteRefreshToken();
      dispatch(setToken(null));
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
      });
      router.replace("(onboarding)/welcome");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }
    dispatch(setLoading(false));
  };
}

export function forgotPassword({
  email,
  password,
  token,
  router,
}: ForgotPasswordProps) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await apiConnector({
        method: "POST",
        url: FORGOT_PASSWORD,
        body: {
          email,
          newPassword: password,
          token,
        },
      });
      if (!data.success) {
        ErrorToast({ message: data?.message });
        dispatch(setLoading(false));
        return;
      }
      SuccessToast({ message: data?.message });
      if (router.canDismiss()) {
        router.dismissTo("(auth)/sign-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorToast({
          message: error?.response?.data?.message || error.message,
        });
      } else {
        ErrorToast({ message: "Something went wrong" });
      }
    }
    dispatch(setLoading(false));
  };
}

export function googleSignIn() {
  return async (dispatch: AppDispatch) => {
    const redirectUri = Linking.createURL("redirect");
    const { GOOGLE_SIGN_IN } = authEndpoints;
    const authUrl = `${GOOGLE_SIGN_IN}?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    if (result.type === "success" && result.url) {
      const { queryParams }: { queryParams: any } = Linking.parse(result.url);
      const { access_token, refresh_token, error } = queryParams;
      if (error === "access_denied") {
        if (router.canGoBack()) {
          router.back();
        }
        return;
      } else if (access_token && refresh_token) {
        storeAccessToken(access_token);
        storeRefreshToken(refresh_token);
        dispatch(setToken(access_token));
        dispatch(setIsAuthenticated(true));
        router.dismissAll();
        router.replace("(root)/home");
      }
    } else if (result.type === "cancel") {
      return;
    } else {
      Alert.alert("Something went wrong!!", "Please try again.");
    }
  };
}
