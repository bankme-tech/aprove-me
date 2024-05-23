import axios from "axios";

type Auth = {
  login: string;
  password: string;
};

export const authenticate = async (auth: Auth) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/v1/integrations/auth",
      auth,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};
