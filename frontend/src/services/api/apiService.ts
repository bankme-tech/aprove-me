import { getServerURL } from "@/utils/getServerURL";
import axios from "axios";

export const api = axios.create({
    baseURL: getServerURL(),
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});