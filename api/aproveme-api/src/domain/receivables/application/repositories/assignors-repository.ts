import { Assignor } from "../../enterprise/entities/assignor";

export abstract class AssignorsRepository {
  abstract create(assignor: Assignor): Promise<void>;
  abstract update(assignor: Assignor): Promise<void>;
  abstract delete(assignor: Assignor): Promise<void>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract findByEmail(email: string): Promise<Assignor | null>;
  abstract findByDocument(document: string): Promise<Assignor | null>;
}
