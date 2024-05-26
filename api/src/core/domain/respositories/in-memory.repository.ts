/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Entity } from '../entity';
import { cleanObject } from '@/utils/functions';

export abstract class InMemoryRepository<T extends Entity<any>> {
  public entities: T[] = [];

  async create(entity: T): Promise<T> {
    this.entities.push(entity);

    return entity;
  }

  async save(entity: T): Promise<T> {
    const index = this.entities.findIndex((item) => item.id === entity.id);

    if (index === -1) {
      this.entities.push(entity);
    } else {
      this.entities[index] = entity;
    }

    return entity;
  }

  async findAll(...args: any[]): Promise<T[]> {
    return this.entities;
  }

  async findById(id: string): Promise<T | null> {
    console.log('ENTITIES AQUI:', this.entities);
    console.log('ID PASSADO: ', id);
    /* @ts-ignore */
    const entity = this.entities.find((item) => item.props.id === id) || null;
    /* @ts-ignore */
    return entity;
  }

  async count(...args: any[]): Promise<number> {
    return this.entities.length;
  }

  async existsById(id: string): Promise<boolean> {
    const entityExists = this.entities.some((item) => item.id === id);

    return entityExists;
  }

  async update(entity: T): Promise<T> {
    const index = this.entities.findIndex((item) => item.id === entity.id);

    if (index >= 0) {
      // @ts-ignore
      this.entities[index].props = {
        // @ts-ignore
        ...this.entities[index].props,
        // @ts-ignore
        ...cleanObject(entity.props),
      } as unknown as T;
    }

    return entity;
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.entities = this.entities.filter((e) => e.id !== id);
    }
  }
}
