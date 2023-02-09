import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3003/integrations",
});

export default api;