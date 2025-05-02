import { getAccessToken } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  signupData: any;
  forgotPasswordData: any;
  loading: boolean;
  token: string | null;
};

const initialState: AuthState = {
  signupData: null,
  forgotPasswordData: null,
  loading: false,
  token: getAccessToken() ? getAccessToken() : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setForgotPasswordData: (state, action) => {
      state.forgotPasswordData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setForgotPasswordData, setLoading, setToken } =
  authSlice.actions;
export default authSlice.reducer;
