import * as bcryptjs from 'bcryptjs';
import { IPassword } from '../interfaces/password.interface';

export class Password implements IPassword {
  readonly value: string;

  private constructor(password: Password) {
    this.value = password.value;
    Object.freeze(this);
  }

  static fromExisting(password: Password): Password {
    return new Password(password);
  }

  static fromStr(password: string): Password {
    return new Password({ value: _hash(password) });
  }
}

function _hash(password: string): string {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}
