import { Assignor } from "../../enterprise/entities/assignor";

export abstract class AssignorsRepository {
  abstract create(assignor: Assignor): Promise<void>;
}
