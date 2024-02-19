import { Payable } from '@prisma/client';

export type PayableWithAssignorName = Payable & {
  assignor: {
    name: string;
  };
};

export abstract class PayableRepository {
  abstract findById(id: string): Promise<Payable | null>;
  abstract findByIdWithAssignorName(
    id: string,
  ): Promise<PayableWithAssignorName | null>;
  abstract findByAssignor(assignorId: string): Promise<Payable[] | null>;
  abstract findAll(): Promise<Payable[]>;
  abstract create(data: Payable): Promise<Payable>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: Partial<Payable>): Promise<Payable>;
}
