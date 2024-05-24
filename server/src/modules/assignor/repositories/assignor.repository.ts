import { GenericRepository } from '@infra/database/shared/generic-repository';
import { Assignor } from '@prisma/client';

export abstract class AssignorRepository extends GenericRepository<Assignor> {
  abstract findByDocument(document: string): Promise<Assignor | null>;
  abstract findAll(): Promise<Assignor[]>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract findByEmailOrDocument(
    email: string,
    document: string,
  ): Promise<Assignor | null>;
  abstract findByEmail(email: string): Promise<Assignor | null>;
}
