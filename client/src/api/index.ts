import axios from "axios";
import { apiBaseUrl } from "../constants";

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/auth", { username, password });

  return response.data;
};

export type Payable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
};

export const getAllPayables = async (): Promise<Payable[]> => {
  const response = await api.get("integrations/payable");

  return response.data;
};
