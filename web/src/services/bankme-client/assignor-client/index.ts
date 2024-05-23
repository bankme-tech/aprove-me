import { Client } from '@/services';
import type { AssignorModel } from '@/services/models/assignor-model';

export class AssignorClient extends Client {
  constructor() {
    super('integrations/assignors');
  }

  public async findAll() {
    const { data } = await this.api.get<{ assignors: AssignorModel[] }>('');
    return data;
  }
}
