import { AuthTokenTypes } from "@/stores/authStore";
import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("@auth");

  if (token) {
    const tokenParsed: AuthTokenTypes = JSON.parse(token);

    return tokenParsed.accessToken;
  }

  return "";
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
