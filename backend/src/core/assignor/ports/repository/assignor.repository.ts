import { Assignor } from '../../model/assignor';

export abstract class AssignorRepository {
  abstract delete(id: string): Promise<void>;
  abstract save(assignor: Assignor): Promise<void>;
  abstract findById(id: string): Promise<Assignor | null>;
}
