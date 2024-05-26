import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFwcm92YW1lIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE2NzMxNDU5LCJleHAiOjE3MTY4MTc4NTl9.E5c9ob5iWR8bij5cimESeVqyfu_T4NdCBJ0K3a3MA7w";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error("Sessão expirada, faça login novamente");
      localStorage.removeItem("token");
      //   window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
