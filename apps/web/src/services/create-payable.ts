import { api, handleResponseError } from './api';

type Result = {
  success: boolean;
  data?: string;
  error?: string[];
};

type PayableData = {
  value: number;
  emissionDate: string;
  assignorId: string;
};

type ApiResponse = {
  payable: {
    id: string;
    value: number;
    emissionDate: string;
    assignorId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function createPayable(payableData: PayableData): Promise<Result> {
  try {
    const { data } = await api.post<ApiResponse>(
      '/integrations/payable/',
      payableData,
    );

    return {
      success: true,
      data: data.payable.id,
    };
  } catch (error) {
    const errorMessages = handleResponseError(error);

    return {
      success: false,
      error: errorMessages,
    };
  }
}
