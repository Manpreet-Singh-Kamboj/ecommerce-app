import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
