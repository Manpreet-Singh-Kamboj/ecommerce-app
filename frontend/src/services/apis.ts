const BASE_URL = "http://192.168.1.48:4000/api";

export const authEndpoints = {
  SIGN_IN: `${BASE_URL}/auth/sign-in`,
  SIGN_UP: `${BASE_URL}/auth/sign-up`,
  SEND_VERIFICATION_OTP: `${BASE_URL}/auth/send-otp`,
};
