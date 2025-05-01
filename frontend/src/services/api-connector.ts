import { getAccessToken } from "@/utils/storage";
import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

type ApiConnectorProps = {
  method: string;
  url: string;
  body?: any;
  headers?: any;
  params?: any;
};

export const apiConnector = ({
  method,
  url,
  body,
  headers,
  params,
}: ApiConnectorProps) => {
  return axiosInstance({
    method,
    url,
    data: body ?? null,
    headers: { ...headers },
    params: params ?? null,
  });
};
