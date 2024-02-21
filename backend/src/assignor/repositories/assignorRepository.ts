import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { UpdateAssignorDto } from '../dto/update-assignor.dto';
import { Assignor } from '../entities/assignor.entity';

export default abstract class AssignorRepository {
  abstract create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
  abstract findOne(id: string): Promise<Assignor>;
  abstract findAll(): Promise<Assignor[]>;
  abstract update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<Assignor>;
}
