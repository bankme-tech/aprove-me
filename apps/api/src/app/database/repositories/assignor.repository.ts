import { Assignor } from '@prisma/client';

export abstract class AssignorRepository {
  abstract findById(id: string): Promise<Assignor | null>;
  abstract findByDocument(document: string): Promise<Assignor | null>;
  abstract create(data: Assignor): Promise<Assignor>;
  abstract delete(id: string): Promise<void>;
}
