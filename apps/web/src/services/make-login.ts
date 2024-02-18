import { api, handleResponseError } from './api';

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

type Result = {
  success: boolean;
  data?: {
    username: string;
    token: string;
  };
  errors?: string[];
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
    const errorMessage = handleResponseError(error);

    return {
      success: false,
      errors: errorMessage,
    };
  }
}
