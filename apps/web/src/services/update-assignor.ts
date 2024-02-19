import { api, handleResponseError } from './api';

type Result = {
  success: boolean;
  error?: string[];
};

type AssignorData = {
  name: string;
  document: string;
  email: string;
  phone: string;
};

export async function updateAssignor(
  assignorId: string,
  data: AssignorData,
): Promise<Result> {
  try {
    await api.put(`/integrations/assignor/${assignorId}`, data);
  } catch (error) {
    const errorMessages = handleResponseError(error);

    return {
      success: false,
      error: errorMessages,
    };
  }

  return {
    success: true,
  };
}
