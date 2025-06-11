import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useAuth() {
  const { token, signupData, loading, forgotPasswordData } = useSelector(
    (state: RootState) => state.auth
  );
  return {
    token,
    signupData,
    loading,
    forgotPasswordData,
  };
}
