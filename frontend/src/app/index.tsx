import ErrorToast from "@/components/Toasts/error-toast";
import useAuth from "@/hooks/useAuth";
import { setLoading, setToken } from "@/redux/slices/auth.slice";
import { apiConnector } from "@/services/api-connector";
import { authEndpoints } from "@/services/apis";
import { getAccessToken } from "@/utils/storage";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import * as Linking from "expo-linking";

const RootPage = () => {
  const { loading } = useAuth();
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      const accessToken = getAccessToken();
      try {
        dispatch(setLoading(true));
        const { IS_AUTHENTICATED } = authEndpoints;

        const { data } = await apiConnector({
          url: IS_AUTHENTICATED,
          method: "POST",
          body: {
            accessToken,
          },
        });
        setIsAuth(data.success);
        if (data.success) {
          dispatch(setToken(accessToken));
        }
      } catch (error) {
        if (
          getAccessToken() != null &&
          accessToken != null &&
          getAccessToken() === accessToken
        ) {
          ErrorToast({
            message: "Please sign in again to continue.",
          });
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    init();
  }, []);

  if (loading) return null;

  return isAuth ? (
    <Redirect href="(root)/home" />
  ) : (
    <Redirect href="(onboarding)/welcome" />
  );
};

export default RootPage;
