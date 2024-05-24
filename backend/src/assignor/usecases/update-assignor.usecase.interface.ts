import { UpdateAssignorInputDTO } from '../dto/update-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IUpdateAssignorUseCase {
  abstract execute(
    updateAssignorDTO: UpdateAssignorInputDTO,
  ): Promise<AssignorEntity>;
}
