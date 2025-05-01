import { setLoading, setToken } from "@/redux/slices/auth.slice";
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
const { SIGN_IN, SIGN_UP, SEND_OTP } = authEndpoints;

type SignInProps = {
  email: string;
  password: string;
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
        Toast.show({
          type: "error",
          text1: data?.message,
        });
        dispatch(setLoading(false));
        return;
      }
      storeAccessToken(data?.accessToken);
      dispatch(setToken(data?.accessToken));
      storeRefreshToken(data?.refreshToken);
      Toast.show({
        type: "success",
        text1: "Signed in successfully",
      });
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("(root)/home");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: error.response?.data.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
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
