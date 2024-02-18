import { AxiosError } from 'axios';
import { api } from './api';

type Params = {
  username: string;
  password: string;
};

type ApiSuccessResponse = {
  token: string;
  user: {
    id: string;
    username: string;
  };
};

type ApiErrorResponse = {
  statusCode: number;
  message: string;
};

type Result = {
  success: boolean;
  data?: {
    username: string;
    token: string;
  };
  error?: string;
};

export async function makeLogin({
  username,
  password,
}: Params): Promise<Result> {
  try {
    const { data } = await api.post<ApiSuccessResponse>('/session', {
      username,
      password,
    });

    return {
      success: true,
      data: {
        token: data.token,
        username: data.user.username,
      },
    };
  } catch (error) {
    let message = 'Não foi possível efetuar o login';

    if (error instanceof AxiosError) {
      const err = (error.response?.data as ApiErrorResponse)?.message;

      if (err === 'invalid_credentials') {
        message = 'Usuário e/ou senha inválidos';
      }
    }

    return {
      success: false,
      error: message,
    };
  }
}
