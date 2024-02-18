import { IBaseEntity } from './base-entity.interface';

export class BaseEntity implements IBaseEntity {
  public id: string;
  public createdAt: Date;
  public updateAt: Date;
}
