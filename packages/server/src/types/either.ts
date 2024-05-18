// Error
export class ResultError<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isOk(): this is ResultOk<L, R> {
    return false;
  }

  isError(): this is ResultError<L, R> {
    return true;
  }
}

// Success
export class ResultOk<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isOk(): this is ResultOk<L, R> {
    return true;
  }

  isError(): this is ResultError<L, R> {
    return false;
  }
}

export type Result<L, R> = ResultError<L, R> | ResultOk<L, R>;

export const Err = <L, R>(value: L): Result<L, R> => {
  return new ResultError(value);
};

export const Ok = <L, R>(value: R): Result<L, R> => {
  return new ResultOk(value);
};
