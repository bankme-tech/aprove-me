import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/integrations/",
})

export default axiosInstance;
