import { api } from './api';

type Result = {
  success: boolean;
};

export async function deletePayable(id: string): Promise<Result> {
  try {
    await api.delete(`/integrations/payable/${id}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
    };
  }
}
