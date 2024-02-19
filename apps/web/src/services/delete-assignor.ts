import { api } from './api';

type Result = {
  success: boolean;
};

export async function deleteAssignor(id: string): Promise<Result> {
  try {
    await api.delete(`/integrations/assignor/${id}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
    };
  }
}
