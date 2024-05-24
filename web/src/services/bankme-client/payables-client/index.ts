import type { CreatePayableSchema } from '@/schemas/payables/create-payable-schema';
import { Client } from '@/services';
import type { PayableModel } from '@/services/models/payable-model';

export class PayablesClient extends Client {
  constructor() {
    super('integrations/payables');
  }

  public async create(createPayableSchema: CreatePayableSchema) {
    const { data } = await this.api.post<PayableModel>('', createPayableSchema);
    return data;
  }

  public async createBatch(batch: { payables: CreatePayableSchema[] }) {
    await this.api.post('/batch', batch);
  }

  public async findAll() {
    const { data } = await this.api.get<{ payables: PayableModel[] }>('');
    return data;
  }
}
