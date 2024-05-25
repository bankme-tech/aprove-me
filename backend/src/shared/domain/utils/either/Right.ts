import { Left } from './Left';

export class Right<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  public isLeft(): this is Left<never> {
    return false;
  }

  public isRight(): this is Right<T> {
    return true;
  }

  static create<U>(value: U): Right<U> {
    return new Right(value);
  }
}
