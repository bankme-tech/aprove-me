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

export const findManyPayable = async ({
  limit = 10,
  page = 1,
}: {
  limit: number;
  page: number;
}) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/v1/integrations/payable?limit=${limit}&page=${page}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};

export const findManyAssignor = async ({
  limit = 10,
  page = 1,
}: {
  limit: number;
  page: number;
}) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/v1/integrations/payable?limit=${limit}&page=${page}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};
