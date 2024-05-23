import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3003',
    headers: {
        'Content-Type': 'application/json',
    },


})

export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

