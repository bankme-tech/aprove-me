import { Payable } from '@prisma/client';

export abstract class PayableRepository {
  abstract findById(id: string): Promise<Payable | null>;
  abstract findByAssignor(assignorId: string): Promise<Payable[] | null>;
  abstract create(data: Payable): Promise<Payable>;
  abstract delete(id: string): Promise<void>;
}
