import { CreateAssignorDTO } from '../dto/create-assignor.dto';
import { IAssignor } from './assignor.interface';

export interface IAssignorService {
  create(assignor: CreateAssignorDTO): Promise<IAssignor>;
  findAll(): Promise<IAssignor[]>;
  findById(id: string): Promise<IAssignor>;
  update(id: string, assignor: Partial<IAssignor>): Promise<IAssignor>;
  delete(id: string): Promise<void>;
}
