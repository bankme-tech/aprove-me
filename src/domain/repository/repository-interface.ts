import { Entity } from '../entity';

export interface IRepository<E extends Entity> {
  add(entity: E): Promise<void>;
  findAll(): Promise<E[] | null>;
}
