/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CreateAssignorSchema } from '@/schemas/assignors/create-assignor-schema';
import type { AssignorModel } from '@/services/models/assignor-model';

import type { AssignorsClient } from '../../clients/assignors-client';

export class MockAssignorsClient implements AssignorsClient {
  public async findAll(): Promise<{ assignors: AssignorModel[] }> {
    return {
      assignors: [
        {
          id: '14e1ee60-d1c7-4e13-b4b7-ed099c3662e3',
          document: 'document1',
          email: 'a@gmail.com',
          name: 'a',
          phone: '999',
          createdAt: new Date(1956, 3, 1),
          updatedAt: new Date(2010, 3, 1),
        },
        {
          id: '7449f7bc-2626-4766-a054-fe10291bcd95',
          document: 'document2',
          email: 'a2@gmail.com',
          name: 'a2',
          phone: '999999',
          createdAt: new Date(1956, 3, 1),
          updatedAt: new Date(2010, 3, 1),
        },
      ],
    };
  }

  public async update(update: {
    id: string;
    partialCreateAssignor: Partial<CreateAssignorSchema>;
  }): Promise<AssignorModel> {
    return {
      id: update.id,
      document: 'document2',
      email: 'a2@gmail.com',
      name: 'a2',
      phone: '999999',
      createdAt: new Date(1956, 3, 1),
      updatedAt: new Date(2010, 3, 1),
      ...update.partialCreateAssignor,
    };
  }

  public async create(
    createAssignorSchema: CreateAssignorSchema,
  ): Promise<AssignorModel> {
    return {
      id: '',
      ...createAssignorSchema,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public async delete(_id: string): Promise<void> {}

  public async find(id: string): Promise<AssignorModel> {
    return {
      id,
      document: 'document2',
      email: 'a2@gmail.com',
      name: 'a2',
      phone: '999999',
      createdAt: new Date(1956, 3, 1),
      updatedAt: new Date(2010, 3, 1),
    };
  }
}
