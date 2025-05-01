import { getAccessToken } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  signupData: any;
  loading: boolean;
  token: string | null;
};

const initialState: AuthState = {
  signupData: null,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
