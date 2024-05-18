import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';

export abstract class AssignorRepository {
  abstract create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
  abstract findById(id: string): Promise<Assignor | null>;
  abstract getAll(): Promise<Assignor[]>;
}
