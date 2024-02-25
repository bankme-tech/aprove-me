import { BasicValidations } from 'bme/core/basic-validations';
import { BaseVO } from 'bme/core/infra/entities/base-vo';
import { Fails } from 'bme/core/messages/fails';

export class AssignorVO extends BaseVO {
  constructor(
    public readonly id: string,
    public readonly document: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly name: string,
  ) {
    super(id);
  }

  public override isValid(): string {
    if (!BasicValidations.isValidCNPJOrCPF(this.document))
      return Fails.INVALID_DOCUMENT;

    if (!BasicValidations.isValidEmail(this.email)) return Fails.INVALID_EMAIL;

    return null;
  }
}
