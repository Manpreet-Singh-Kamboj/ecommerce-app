import * as SecureStore from "expo-secure-store";

export const storeAccessToken = (accessToken: string) => {
  SecureStore.setItem("accessToken", accessToken);
};

export const storeRefreshToken = (refreshToken: string) => {
  SecureStore.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  const result = SecureStore.getItem("accessToken");
  if (result) {
    return result;
  }
  return null;
};

export const getRefreshToken = () => {
  const result = SecureStore.getItem("refreshToken");
  if (result) {
    return result;
  }
  return null;
};

export const deleteAccessToken = async () => {
  await SecureStore.deleteItemAsync("accessToken");
};

export const deleteRefreshToken = async () => {
  await SecureStore.deleteItemAsync("refreshToken");
};
