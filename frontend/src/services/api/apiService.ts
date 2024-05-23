import { getServerURL } from "@/utils/getServerURL";
import axios from "axios";

export const api = axios.create({
    baseURL: getServerURL().concat("/api"),
});