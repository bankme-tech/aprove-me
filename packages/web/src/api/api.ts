import axios from "axios";

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
      window.location.replace('/')
    }
    return Promise.reject(err);
  },
);
