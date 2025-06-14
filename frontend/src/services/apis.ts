const BASE_URL = "https://ecommerce-app-rn.vercel.app/api";
// const BASE_URL = "http://192.168.1.71:4000/api";

export const authEndpoints = {
  SIGN_IN: `${BASE_URL}/auth/sign-in`,
  SIGN_UP: `${BASE_URL}/auth/sign-up`,
  GOOGLE_SIGN_IN: `${BASE_URL}/auth/google`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
  SEND_VERIFICATION_OTP: `${BASE_URL}/auth/send-otp`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  FORGOT_PASSWORD_OTP_VERIFY: `${BASE_URL}/auth/verify-reset-password-otp`,
  IS_AUTHENTICATED: `${BASE_URL}/auth/auth-status`,
};
