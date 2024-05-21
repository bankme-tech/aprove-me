/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Represents a value of either Left or Right variant.
 * @template T - The type of the value.
 * @template E - The type of the error.
 */
export type IEither<T, E extends Error> = Left<T, E> | Right<T, E>;

/**
 * Creates an Either with a Right variant containing the provided value.
 * @param value - The value to wrap in Right.
 * @returns An Either containing the provided value.
 */
export function right<T, E extends Error>(value: T): IEither<T, E> {
  return new Right<T, E>(value);
}

/**
 * Creates an Either with a Left variant containing the provided error.
 * @param error - The error to wrap in Left.
 * @returns An Either containing the provided error.
 */
export function left<T, E extends Error>(error: E): IEither<T, E> {
  return new Left<T, E>(error);
}

/**
 * Represents a value that is present.
 */
export class Right<T, E extends Error> {
  /**
   * Constructs a new instance of Right.
   * @param value - The value that is present.
   */
  constructor(readonly value: T) {
    Object.freeze(this);
  }

  /**
   * Checks if this instance is Right.
   * @returns True, indicating that this instance is Right.
   */
  isRight(): this is Right<T, E> {
    return true;
  }

  /**
   * Checks if this instance is Left.
   * @returns False, indicating that this instance is not Left.
   */
  isLeft(): this is Left<T, E> {
    return false;
  }

  /**
   * Unwraps the value.
   * @param message - Optional message to include in case of unwrapping
   * failure.
   * @returns The unwrapped value.
   */
  unwrap(message?: string | undefined): T {
    return this.value;
  }

  /**
   * Unwraps the value, or returns a default value if the value is Left.
   * @template D - The type of the default value.
   * @param defaultValue - The default value to return if the value is Left.
   * @returns The unwrapped value or the default value.
   */
  unwrapOr<D>(defaultValue: D): T | D {
    return this.value;
  }

  /**
   * Maps the value to a new value.
   * @template M - The type of the mapped value.
   * @param fn - The mapping function.
   * @returns An Either containing the mapped value.
   */
  map<M>(fn: (value: T) => M): IEither<M, E> {
    return new Right<M, E>(fn(this.value));
  }
}

/**
 * Represents a value that is not present due to an error.
 */
export class Left<T, E extends Error> {
  /**
   * Constructs a new instance of Left.
   * @param error - The error associated with this Left value.
   */
  constructor(readonly error: E) {
    Object.freeze(this);
  }

  /**
   * Checks if this instance is Right.
   * @returns False, indicating that this instance is not Right.
   */
  isRight(): this is Right<T, E> {
    return false;
  }

  /**
   * Checks if this instance is Left.
   * @returns True, indicating that this instance is Left.
   */
  isLeft(): this is Left<T, E> {
    return true;
  }

  /**
   * Unwraps the value. Throws an error indicating the value is Left.
   * @param message - Optional message to include in the error.
   * @throws Always throws an error indicating the value is Left.
   */
  unwrap(message?: string | undefined): T {
    throw new Error(message ?? 'Cannot unwrap a Left value.');
  }

  /**
   * Unwraps the value, or returns a default value if the value is Left.
   * @template D - The type of the default value.
   * @param defaultValue - The default value to return if the value is
   * Left.
   * @returns The default value.
   */
  unwrapOr<D>(defaultValue: D): T | D {
    return defaultValue;
  }

  /**
   * Maps the value to a new value. Always returns Left since there is no
   * value to map.
   * @template M - The type of the mapped value.
   * @param fn - The mapping function.
   * @returns An Either containing the original error.
   */
  map<M>(fn: (value: T) => M): IEither<M, E> {
    return new Left<M, E>(this.error);
  }
}
