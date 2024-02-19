import { api } from '@/lib/axios';
import { Assignor, AssignorSchema } from '@/types/assignor';
import { LoginSchema } from '@/types/login';
import { Receivable, ReceivableSchema } from '@/types/receivable';

export class Api {
  static async login(data: LoginSchema) {
    const response = await api.post<{ token: string }>(
      '/integrations/auth',
      data
    );
    const { token } = response.data;
    return token;
  }

  static async createAssignor(data: AssignorSchema) {
    const response = await api.post('/integrations/assignor', data);

    const resData = await response.data;

    return resData;
  }

  static async createReceivable(data: ReceivableSchema) {
    const response = await api.post('/integrations/payable', data);

    return response.data;
  }

  static async fetchAssignors() {
    const response = await api.get<{ assignors: Assignor[] }>(
      '/integrations/assignor'
    );

    const { assignors } = response.data;

    return assignors;
  }

  static async fetchReceivables() {
    const response = await api.get<{ receivables: Receivable[] }>(
      '/integrations/payable'
    );

    const { receivables } = response.data;

    return receivables;
  }

  static async deleteReceivable(id: string) {
    const response = await api.delete(`/integrations/payable/${id}`);

    const data = await response.data;

    return data;
  }

  static async getReceivable(id: string) {
    const reponse = await api.get<{ receivable: Receivable }>(
      `/integrations/payable/${id}`
    );

    const { receivable } = reponse.data;

    return receivable;
  }
}
