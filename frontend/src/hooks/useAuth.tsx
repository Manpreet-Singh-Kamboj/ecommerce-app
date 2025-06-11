import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/store/hooks";

export default function useAuth() {
  const { token, signupData, loading, forgotPasswordData } = useAppSelector(
    (state: RootState) => state.auth
  );
  return {
    token,
    signupData,
    loading,
    forgotPasswordData,
  };
}
