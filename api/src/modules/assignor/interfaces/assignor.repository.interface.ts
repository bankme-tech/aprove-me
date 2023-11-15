import { IAssignor } from './assignor.interface';

export interface IAssignorRepository {
  create(assignor: IAssignor): Promise<IAssignor>;
  findAll(): Promise<IAssignor[]>;
  findById(id: string): Promise<IAssignor>;
  update(assignor: Partial<IAssignor>): Promise<IAssignor>;
  delete(id: string): Promise<void>;
}
