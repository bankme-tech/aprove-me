import axios from "axios";

const accessToken = localStorage.getItem("@Project:accessToken");
const url = import.meta.env.VITE_APP_BACKEND_URL;
export const apiAuth = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Keep-Alive": "timeout: 20",
    "X-Powered-By": "Express",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`
  }
});
