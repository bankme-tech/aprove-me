import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IFindAllAssignorsUseCase {
  abstract execute(): Promise<AssignorEntity[]>;
}
