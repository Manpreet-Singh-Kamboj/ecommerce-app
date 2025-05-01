import Toast from "react-native-toast-message";

type ErrorToastProps = {
  message: string;
};

const ErrorToast = ({ message }: ErrorToastProps) => {
  return Toast.show({
    type: "error",
    text1: message,
  });
};

export default ErrorToast;
