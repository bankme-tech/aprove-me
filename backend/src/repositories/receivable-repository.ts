import { CreateReceivableDto } from 'src/domain/dtos';
import { Receivable } from 'src/domain/entities';

export abstract class ReceivableRepository {
  abstract create(input: CreateReceivableDto): Promise<Receivable>;
  abstract fetchById(id: string): Promise<Receivable[]>;
  abstract findById(id: string): Promise<Receivable | null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteMany(assignor_id: string): Promise<void>;
}
