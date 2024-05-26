import type { CreateAssignorSchema } from '@/schemas/assignors/create-assignor-schema';
import type { AssignorModel } from '@/services/models/assignor-model';

import type { AssignorsClient } from '../../clients/assignors-client';
import { AxiosClient } from './axios-client';

export class AxiosAssignorClient
  extends AxiosClient
  implements AssignorsClient
{
  constructor() {
    super('integrations/assignors');
  }

  public async findAll() {
    const { data } = await this.api.get<{ assignors: AssignorModel[] }>('');
    return data;
  }

  public async update({
    id,
    partialCreateAssignor,
  }: {
    id: string;
    partialCreateAssignor: Partial<CreateAssignorSchema>;
  }) {
    const { data } = await this.api.patch<AssignorModel>(
      `${id}`,
      partialCreateAssignor,
    );
    return data;
  }

  public async create(createAssignorSchema: CreateAssignorSchema) {
    const { data } = await this.api.post<AssignorModel>(
      '',
      createAssignorSchema,
    );
    return data;
  }

  public async delete(id: string) {
    await this.api.delete(`${id}`);
  }

  public async find(id: string) {
    const { data } = await this.api.get<AssignorModel>(`/${id}`);

    return data;
  }
}
