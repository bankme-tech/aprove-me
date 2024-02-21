import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';

export default abstract class AssignorRepository {
  abstract create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
}
