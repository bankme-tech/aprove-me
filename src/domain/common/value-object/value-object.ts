import isEqual from 'lodash/isEqual';

export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  public equals(obj: this): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (obj.value === undefined) {
      return false;
    }

    if (obj.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this.value, obj.value);
  }

  toString(): string {
    if (this.value === null || this.value === undefined) {
      return String(this.value);
    }

    if (typeof this.value !== 'object') {
      return String(this.value);
    }

    try {
      const valueStr = this.value.toString();
      return valueStr === '[object Object]'
        ? JSON.stringify(this.value)
        : valueStr;
    } catch (e) {
      return JSON.stringify(this.value);
    }
  }
}

export function deepFreeze<T>(obj: T) {
  try {
    const propNames = Object.getOwnPropertyNames(obj);

    for (const name of propNames) {
      const value = obj[name as keyof T];

      if (value && typeof value === 'object') {
        deepFreeze(value);
      }
    }

    return Object.freeze(obj);
  } catch (e) {
    return obj;
  }
}
