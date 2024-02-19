import { api, handleResponseError } from './api';

type Result = {
  success: boolean;
  data?: string;
  error?: string[];
};

type AssignorData = {
  name: string;
  document: string;
  email: string;
  phone: string;
};

type ApiResponse = {
  assignor: {
    id: string;
    document: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function createAssignor(
  assignorData: AssignorData,
): Promise<Result> {
  try {
    const { data } = await api.post<ApiResponse>(
      '/integrations/assignor/',
      assignorData,
    );

    return {
      success: true,
      data: data.assignor.id,
    };
  } catch (error) {
    const errorMessages = handleResponseError(error);

    return {
      success: false,
      error: errorMessages,
    };
  }
}
