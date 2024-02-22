import { BaseVO } from 'bme/core/infra/entities/base-vo';
import { AssignorVO } from '../../assignors/vos/assignor.vo';
import { Fails } from 'bme/core/messages/fails';

export class PayableVO extends BaseVO {
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly emissionDate: Date,
    public readonly assignorId: string,
    public readonly assignor: AssignorVO,
  ) {
    super(id);
  }

  public override isValid(): string {
    if (
      (!this.assignor && !this.assignorId) ||
      (this.assignor && this.assignorId)
    )
      return Fails.INVALID_ASSIGNOR;

    if (this.value <= 0) return Fails.PAYMENTVALUE_MUSTBE_GREATERTHANZERO;
    return null;
  }
}
