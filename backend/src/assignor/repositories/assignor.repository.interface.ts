import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';
import { UpdateAssignorInputDTO } from '../dto/update-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IAssignorRepository {
  abstract save(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity>;
  abstract findAll(): Promise<AssignorEntity[]>;
  abstract findById(id: string): Promise<AssignorEntity>;
  abstract update(assignor: UpdateAssignorInputDTO): Promise<AssignorEntity>;
  abstract remove(id: string): Promise<void>;
}
