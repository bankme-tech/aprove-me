import { api, handleResponseError } from './api';

type Params = {
  username: string;
  password: string;
};

type Result = {
  success: boolean;
  errors?: string[];
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
    const errorMessages = handleResponseError(error);

    return {
      success: false,
      errors: errorMessages,
    };
  }
}
