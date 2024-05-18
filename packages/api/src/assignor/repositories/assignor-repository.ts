import { Assignor } from '../entities/assignor.entity';
import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { UpdateAssignorDto } from '@assignor/dto/update-assignor.dto';

export abstract class AssignorRepository {
  abstract getAll(): Promise<Assignor[]>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
  abstract update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<Assignor>;
}
