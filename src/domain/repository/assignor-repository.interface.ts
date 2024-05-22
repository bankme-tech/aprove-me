import { IRepository } from './repository-interface';
import { AssignorEntity } from '../entity/assignor.entity';

export interface IAssignorRepository extends IRepository<AssignorEntity> {
  findByDocument(document: string): Promise<AssignorEntity | null>;
}
