import { api } from '@/lib/axios';
import { AssignorSchema } from '@/types/assignor';
import { LoginSchema } from '@/types/login';
import { ReceivableSchema } from '@/types/receivable';

export class Api {
  static async login(data: LoginSchema) {
    const response = await api.post('/', data);

    return {
      data: response.data,
      status: response.status,
    };
  }

  static async createAssignor(data: AssignorSchema) {
    const response = await api.post('/integrations/assignor', data);

    return {
      data: response.data,
      status: response.status,
    };
  }

  static async createReceivable(data: ReceivableSchema) {
    const response = await api.post('/integrations/payable', data);

    return {
      data: response.data,
      status: response.status,
    };
  }

  static async fetchAssignors() {
    const response = await api.get('/integrations/assignor', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmY5NDFiMy1kM2ZmLTQ5N2YtYTViZC00MmFjN2JjZTczOTYiLCJpYXQiOjE3MDgwOTI2ODcsImV4cCI6MTcwODA5ODY4N30.C_b8Ccy-UAo5lYlXwUQ6qxwC7NFOiiFIp3uMN4eB7Xo',
      },
    });
    console.log(response.data);

    return {
      result: response.data,
      status: response.status,
    };
  }
}
