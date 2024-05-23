import * as crypto from 'crypto';

import { ValueObject } from './value-object';
import { InvalidUuidException } from '../exception';

export class UniqueEntityIdVO extends ValueObject<string> {
  private readonly _uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(id?: string) {
    super(id || crypto.randomUUID());
    this.validate();
  }

  private validate() {
    const isValid = this._uuidV4Regex.test(this._value);

    if (!isValid) {
      throw new InvalidUuidException(this.value);
    }
  }
}
