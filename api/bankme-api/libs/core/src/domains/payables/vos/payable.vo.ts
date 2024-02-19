import { BaseVO } from 'bme/core/infra/entities/base-vo';

export class PayableVO extends BaseVO {
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly emissionDate: Date,
    public readonly assignorId: string,
  ) {
    super(id);
  }
}
