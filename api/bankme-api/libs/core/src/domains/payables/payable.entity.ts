import { BaseEntity } from 'bme/core/infra/entities/base-entity';

export class Payable extends BaseEntity {
  public value: number;
  public emissionDate: Date;
  public assignorId: string;
}
