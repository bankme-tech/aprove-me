import type { CreatePayableSchema } from '@/schemas/payables/create-payable-schema';
import type { PayableModel } from '@/services/models/payable-model';

export abstract class PayablesClient {
  public abstract create(
    createPayableSchema: CreatePayableSchema,
  ): Promise<PayableModel>;

  public abstract createBatch(batch: {
    payables: CreatePayableSchema[];
  }): Promise<void>;

  public abstract findAll(): Promise<{ payables: PayableModel[] }>;

  public abstract find(id: string): Promise<PayableModel>;

  public abstract update(update: {
    partialCreatePayable: Partial<CreatePayableSchema>;
    id: string;
  }): Promise<PayableModel>;

  public abstract delete(id: string): Promise<void>;
}
