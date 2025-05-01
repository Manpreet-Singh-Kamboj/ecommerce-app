import { useSelector } from "react-redux";

export default function useAuth() {
  const { token, signupData, loading } = useSelector(
    (state: any) => state.auth
  );
  return {
    token,
    signupData,
    loading,
  };
}
