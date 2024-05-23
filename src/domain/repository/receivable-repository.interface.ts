import { IRepository } from './repository-interface';
import { ReceivableEntity } from '../entity';

export interface IReceivableRepository extends IRepository<ReceivableEntity> {
  addMany(entities: ReceivableEntity[]): Promise<void>;
}
