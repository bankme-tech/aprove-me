import { IAssignor } from './assignor.interface';

export interface IAssignorRepository {
  create(assignor: IAssignor): Promise<IAssignor>;
}
