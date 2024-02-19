import { api, handleResponseError } from './api';

type Result = {
  success: boolean;
  error?: string[];
};

type PayableData = {
  value: number;
  emissionDate: string;
  assignorId: string;
};

export async function updatePayable(
  payableId: string,
  data: PayableData,
): Promise<Result> {
  try {
    await api.put(`/integrations/payable/${payableId}`, data);
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
