import { isValidCPF, formatCPF } from '@brazilian-utils/brazilian-utils';

import { InvalidFieldError } from '../exception';
import { ValueObject } from "./value-object";

export class CpfVO extends ValueObject<string> {
  constructor(cpf: string) {
    super(cpf.replace(/\D/g, ''));
    this.validate();
  }

  private validate() {
    const isValid = isValidCPF(this._value);

    if (!isValid) throw new InvalidFieldError('cpf');
  }

  toString () {
    return formatCPF(this._value, { pad: true });
  };
};