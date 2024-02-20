import { BaseEntity } from 'bme/core/infra/entities/base-entity';

export class Assignor extends BaseEntity {
  public document: string;
  public email: string;
  public phone: string;
  public name: string;
}
