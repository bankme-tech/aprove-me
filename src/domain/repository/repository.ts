import { Entity } from '../entity';

export interface IRepository<E extends Entity> {
  add(entity: E): Promise<void>;
  findById(id: any): Promise<E | null>;
  findAll(): Promise<E[]>;
  delete(entity: E): Promise<void>;
}
