import { Right } from './Right';

export class Left<T> {
  readonly value: T;

  private constructor(error: T) {
    this.value = error;
  }

  public isLeft(): this is Left<T> {
    return true;
  }

  public isRight(): this is Right<never> {
    return false;
  }

  static create<U>(error: U): Left<U> {
    return new Left(error);
  }
}
