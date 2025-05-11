import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
} from "@/utils/storage";
import axios from "axios";
import { authEndpoints } from "./apis";
import ErrorToast from "@/components/Toasts/error-toast";
import { router } from "expo-router";
const { REFRESH_TOKEN } = authEndpoints;

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const { data } = await axios.post(REFRESH_TOKEN, {
            refreshToken,
          });
          if (!data.success) {
            ErrorToast({
              message: "Internal Server Error",
            });
            return;
          }
          const { accessToken, refreshToken: newRefreshToken } = data;
          storeAccessToken(accessToken);
          storeRefreshToken(newRefreshToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          router.replace("/home");
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        deleteAccessToken();
        deleteRefreshToken();
        ErrorToast({
          message: "Please sign in again to continue.",
        });
        router.replace("/welcome");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

type ApiConnectorProps = {
  method: string;
  url: string;
  body?: any;
  headers?: any;
  params?: any;
};

export const apiConnector = ({
  method,
  url,
  body,
  headers,
  params,
}: ApiConnectorProps) => {
  return axiosInstance({
    method,
    url,
    data: body ?? null,
    headers: { ...headers },
    params: params ?? null,
  });
};
