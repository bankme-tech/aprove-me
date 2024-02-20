import { Assignor } from '../entities/assignor.entity';
import { AssignorVO } from '../vos/assignor.vo';

export interface IAssignorDomainService {
  validate(data: AssignorVO): Promise<string[]>;
  create(data: AssignorVO): Promise<Assignor>;
  changeById(id: string, data: AssignorVO): Promise<Assignor>;
  removeById(id: string): Promise<AssignorVO>;
  getAll(): Promise<AssignorVO[]>;
}
