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

  public async find(id: string) {
    const { data } = await this.api.get<PayableModel>(`/${id}`);
    return data;
  }

  public async update({
    partialCreatePayable,
    id,
  }: {
    partialCreatePayable: Partial<CreatePayableSchema>;
    id: string;
  }) {
    const { data } = await this.api.patch<PayableModel>(
      `${id}`,
      partialCreatePayable,
    );
    return data;
  }

  public async delete(id: string) {
    await this.api.delete(`/${id}`);
  }
}
