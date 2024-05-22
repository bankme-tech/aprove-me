import { Assignor } from '@/app/entities/assignor';

export abstract class AssignorRepository {
  public abstract create(assignor: Assignor): Promise<Assignor>;
  public abstract findById(assignorId: string): Promise<Assignor | null>;
}
