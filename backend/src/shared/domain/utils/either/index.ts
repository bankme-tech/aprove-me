export type Either<T, U> = Left<T> | Right<U>;

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
