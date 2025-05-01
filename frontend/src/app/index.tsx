import useAuth from "@/hooks/useAuth";
import { setToken } from "@/redux/slices/auth.slice";
import { getAccessToken } from "@/utils/storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RootPage = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const storedToken = getAccessToken();
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    };
    init();
  }, []);

  return token ? (
    <Redirect href="(root)/home" />
  ) : (
    <Redirect href="(onboarding)/welcome" />
  );
};

export default RootPage;
