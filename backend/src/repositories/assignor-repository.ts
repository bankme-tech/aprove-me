import { CreateAssignorDto, UpdateAssignorDto } from 'src/domain/dtos';
import { Assignor } from 'src/domain/entities';

export abstract class AssignorRepository {
  abstract create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<void>;
}
