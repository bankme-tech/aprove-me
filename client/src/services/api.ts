import axios from "axios";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";  

// ---> Ainda não consegui extrair o JWT fora do Context do app

// const getAccessToken = async (req: NextApiRequest) => {
//   const session = await getSession({ req });
//   return session?.token;
// };

// --->

//A env estava com problema, portanto, criei uma variável local apenas para resolver temporiarimente.
const baseUrl = "http://localhost:3001"

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(async (config) => {
  // --->Token não vai subir assim para produção, foi apenas para resolver temporiariamente o problema listado no topo
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJrQGJrLmNvbSIsInN1YiI6MywiaWF0IjoxNjc4MTA3MDc1LCJleHAiOjE2NzgxMDcxMzV9.kwRqiIoBgNbXHCb6osN37qPdvx2zT0m9AbauGtTrT7o";
  // --->
  
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
