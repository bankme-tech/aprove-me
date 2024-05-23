import { isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import { ValueObject } from './value-object';
import { InvalidFieldException } from '../exception';

export class PhoneVO extends ValueObject<string> {
  constructor(number: string) {
    super(number.trim().replace(/\D/g, ''));
    this.validate();
  }

  private validate() {
    const isValid = isValidMobilePhone(this._value);

    if (!isValid) throw new InvalidFieldException('phone');
  }

  toString() {
    return this._value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
