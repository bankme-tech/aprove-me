import { getToken } from "@/lib";
import { getServerURL } from "@/utils/getServerURL";
import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
    baseURL: getServerURL(),
});

api.interceptors.request.use(async (config) => {
    const token = typeof window === "undefined" ? getCookie("token") : await getToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export { api };