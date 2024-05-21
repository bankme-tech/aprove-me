import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import { InvalidFieldError } from '../exception';

export class EmailVO {
  private readonly _value: string;

  constructor(email: string) {
    this._value = email;
    this.validate();
  }

  private validate() {
    const isValid = isValidEmail(this.value);
    if (!isValid) throw new InvalidFieldError('e-mail');
  }

  get value() {
    return this._value;
  }
}
