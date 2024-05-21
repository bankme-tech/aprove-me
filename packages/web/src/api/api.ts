import axios from "axios";
import { redirect } from "next/navigation";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/integrations",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status || null;

    if (status === 401) {
      console.warn(status);
      redirect("/");
    }
    return Promise.reject(err);
  },
);
