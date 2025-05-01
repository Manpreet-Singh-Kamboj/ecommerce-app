import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";

export const rootReducer = combineReducers({
  auth: authSlice,
});
