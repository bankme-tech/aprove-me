import axios from "axios";
import { redirect } from "react-router-dom";
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

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       redirect("/");
//     }
//     return Promise.reject(error);
//   }
// );

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return api.post("/auth", { username, password });
};

type Payable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: string;
};

export const getPayables = async (id: string): Promise<Payable> => {
  return api.get(`integrations/payable/${id}`);
};
