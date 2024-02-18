import { AxiosError } from 'axios';
import { api } from './api';

type Params = {
  username: string;
  password: string;
};

type ApiErrorResponse = {
  statusCode: number;
  message: string;
};

type Result = {
  success: boolean;
  error?: string;
};

export async function makeRegister({
  username,
  password,
}: Params): Promise<Result> {
  try {
    await api.post('/integrations/user', {
      username,
      password,
    });

    return {
      success: true,
    };
  } catch (error) {
    let message = 'Não foi possível criar sua conta';

    if (error instanceof AxiosError) {
      const err = (error.response?.data as ApiErrorResponse)?.message;

      if (err === 'username_already_in_use') {
        message = 'Nome de usuário já em uso';
      }
      if (err === 'password_too_small') {
        message = 'Sua senha deve ter no mínimo 8 caracteres';
      }
    }

    return {
      success: false,
      error: message,
    };
  }
}
