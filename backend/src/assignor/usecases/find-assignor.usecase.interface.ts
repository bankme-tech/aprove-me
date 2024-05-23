import { FindAssignorInputDTO } from '../dto/find-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IFindAssignorUseCase {
  abstract execute(
    findAssignorDTO: FindAssignorInputDTO,
  ): Promise<AssignorEntity>;
}
