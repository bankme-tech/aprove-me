'use server'
import { getToken } from "@/lib";
import { getServerURL } from "@/utils/getServerURL";
import axios from "axios";

export const api = axios.create({
    baseURL: getServerURL(),
});

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});