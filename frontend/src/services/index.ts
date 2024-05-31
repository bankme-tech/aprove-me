import { authenticatedFetch } from "./authenticatedFetch";

type Auth = {
  login: string;
  password: string;
};

export const authenticate = async (auth: Auth) => {
  try {
    const response = await fetch("http://localhost:4000/v1/integrations/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(auth),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
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
    const response = await authenticatedFetch(
      `http://localhost:4000/v1/integrations/payable?limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
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
    const response = await authenticatedFetch(
      `http://localhost:4000/v1/integrations/assignor?limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};

export const findOnePayable = async (id: string) => {
  try {
    const response = await authenticatedFetch(
      `http://localhost:4000/v1/integrations/payable/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};

export const findOneAssignor = async (assignorId: string) => {
  try {
    const response = await authenticatedFetch(
      `http://localhost:4000/v1/integrations/assignor/${assignorId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};

export const createPayable = async (body: any) => {
  try {
    const response = await authenticatedFetch(
      `http://localhost:4000/v1/integrations/payable/`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return error;
  }
};
