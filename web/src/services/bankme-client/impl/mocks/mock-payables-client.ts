/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import type { CreatePayableSchema } from '@/schemas/payables/create-payable-schema';
import type { PayableModel } from '@/services/models/payable-model';

import type { PayablesClient } from '../../clients/payables-client';

export class MockPayblesClient implements PayablesClient {
  public async create({
    value,
    emissionDate,
    assignor,
  }: CreatePayableSchema): Promise<PayableModel> {
    return {
      id: '8cce3168-6166-4f5c-9280-e270659973aa',
      value,
      emissionDate,
      assignor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public async createBatch(_batch: {
    payables: { value: number; emissionDate: Date; assignor: string }[];
  }): Promise<void> {}

  public async findAll(): Promise<{ payables: PayableModel[] }> {
    return {
      payables: [
        {
          id: '8cce3168-6166-4f5c-9280-e270659973aa',
          value: 1000,
          emissionDate: new Date(1970, 3, 1),
          assignor: '67971d4d-96de-4de0-81cd-c6aa96e53864',
          createdAt: new Date(1972, 3, 1),
          updatedAt: new Date(1971, 3, 1),
        },
        {
          id: '3003f7ea-ef9d-43df-8e08-c204e56aa444',
          value: 2342,
          emissionDate: new Date(2001, 3, 1),
          assignor: '63592cba-a930-4b34-9248-6562a680fa8f',
          createdAt: new Date(1956, 3, 1),
          updatedAt: new Date(2010, 3, 1),
        },
        {
          id: '08f4f134-5648-4319-b1cf-3cefb972d658',
          value: 345987,
          emissionDate: new Date(2001, 3, 1),
          assignor: '63592cba-a930-4b34-9248-6562a680fa8f',
          createdAt: new Date(1956, 3, 1),
          updatedAt: new Date(2010, 3, 1),
        },
      ],
    };
  }

  public async find(id: string): Promise<PayableModel> {
    return {
      id,
      value: 1000,
      emissionDate: new Date(1970, 3, 1),
      assignor: '67971d4d-96de-4de0-81cd-c6aa96e53864',
      createdAt: new Date(1972, 3, 1),
      updatedAt: new Date(1971, 3, 1),
    };
  }

  public async update(update: {
    partialCreatePayable: Partial<{
      value: number;
      emissionDate: Date;
      assignor: string;
    }>;
    id: string;
  }): Promise<PayableModel> {
    return {
      id: '238739a9-51d3-4eec-bf8a-8fa7234a6679',
      value: 1000,
      emissionDate: new Date(1970, 3, 1),
      assignor: '67971d4d-96de-4de0-81cd-c6aa96e53864',
      createdAt: new Date(1972, 3, 1),
      updatedAt: new Date(1971, 3, 1),
      ...update.partialCreatePayable,
    };
  }

  public async delete(_id: string): Promise<void> {}
}
