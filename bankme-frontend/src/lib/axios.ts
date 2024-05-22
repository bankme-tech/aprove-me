import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/integrations",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
