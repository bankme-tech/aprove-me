import { AssignorEntity } from '../entities/assignor.entity';
import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';

export abstract class ICreateAssignorUseCase {
  abstract execute(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity>;
}
