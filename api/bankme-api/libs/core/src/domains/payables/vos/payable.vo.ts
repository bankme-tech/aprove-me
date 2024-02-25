import { BaseVO } from 'bme/core/infra/entities/base-vo';
import { AssignorVO } from '../../assignors/vos/assignor.vo';
import { Fails } from 'bme/core/messages/fails';
import { BasicValidations } from 'bme/core/basic-validations';

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

    if (!BasicValidations.isValidDate(this.emissionDate.toISOString()))
      return Fails.INVALID_EMISSIONDATE;

    if (this.value <= 0) return Fails.PAYMENTVALUE_MUSTBE_GREATERTHANZERO;

    if (this.assignor) {
      const assignorResult = this.assignor.isValid();
      if (assignorResult) return assignorResult;
    }

    return null;
  }
}
