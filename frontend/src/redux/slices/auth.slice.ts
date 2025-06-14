import { getAccessToken } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  signupData: any;
  forgotPasswordData: any;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  signupData: null,
  forgotPasswordData: null,
  loading: false,
  token: getAccessToken() ? getAccessToken() : null,
  isAuthenticated: false,
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
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  setSignupData,
  setForgotPasswordData,
  setLoading,
  setToken,
  setIsAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
