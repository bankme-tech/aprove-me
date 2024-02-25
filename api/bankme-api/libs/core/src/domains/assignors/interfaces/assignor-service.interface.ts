import { IErrorDomainService } from 'bme/core/infra/errors/error-domain-service.interface';
import { Assignor } from '../entities/assignor.entity';
import { AssignorVO } from '../vos/assignor.vo';

export interface IAssignorDomainService extends IErrorDomainService {
  validate(data: AssignorVO): Promise<boolean>;
  create(data: AssignorVO): Promise<Assignor>;
  removeById(id: string): Promise<AssignorVO>;
  getAll(): Promise<AssignorVO[]>;
  getById(id: string): Promise<AssignorVO>;
}
