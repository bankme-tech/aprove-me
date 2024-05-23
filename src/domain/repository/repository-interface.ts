import { Entity } from '../entity';

export interface IRepository<E extends Entity> {
  add(entity: E): Promise<void>;
  findById(id: string): Promise<E | null>;
}
