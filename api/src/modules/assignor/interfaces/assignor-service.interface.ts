import { CreateAssignorDTO } from '../dto/create-assignor.dto';
import { IAssignor } from './assignor.interface';

export interface IAssignorService {
  create(assignor: CreateAssignorDTO): Promise<IAssignor>;
}
