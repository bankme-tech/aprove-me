/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Represents an optional value that can either be `Some` or `None`.
 * @template T - The type of the value contained in the option.
 */
export type IOption<T> = Some<T> | None<T>;

/**
 * Creates an Option with a Some variant containing the provided value.
 * @template T - The type of the value.
 * @param value - The value to wrap in Some.
 * @returns An Option containing the provided value.
 */
export function some<T>(value: T): IOption<T> {
  return new Some(value);
}

/**
 * Creates an Option with a None variant.
 * @template T - The type of the value that would have been contained in
 * Some (defaults to never).
 * @returns An Option representing the absence of a value.
 */
export function none<T = never>(): IOption<T> {
  return new None();
}

/**
 * Converts a nullable or undefined value to an Option.
 * If the value is not null or undefined, it wraps it in Some; otherwise,
 * it returns None.
 * @template T - The type of the value.
 * @param value - The value to convert to an Option.
 * @returns An Option containing the provided value if it's not null or
 * undefined; otherwise, None.
 */
export function toOption<T>(value: T | undefined | null): IOption<T> {
  return value ? some(value) : none();
}

/**
 * Extracts the value from an Option.
 * If the Option is Some, it unwraps and returns the value; otherwise, it
 * returns null.
 * @template T - The type of the value.
 * @param value - The Option from which to extract the value.
 * @returns The extracted value if the Option is Some; otherwise, null.
 */
export function fromOption<T>(value: IOption<T>): T | null {
  return value.isSome() ? value.unwrap() : null;
}

/**
 * Represents a value that exists.
 * @template T - The type of the value.
 */
export class Some<T> {
  /**
   * Constructs a new instance of Some.
   * @param value - The value that exists.
   */
  constructor(readonly value: T) {
    Object.freeze(this);
  }

  /**
   * Checks if this instance is Some.
   * @returns True, indicating that this instance is Some.
   */
  isSome(): this is Some<T> {
    return true;
  }

  /**
   * Checks if this instance is None.
   * @returns False, indicating that this instance is not None.
   */
  isNone(): this is None<T> {
    return false;
  }

  /**
   * Unwraps the value.
   * @param message - Optional message to include in case of unwrapping failure.
   * @returns The unwrapped value.
   */
  unwrap(message?: string): T {
    return this.value;
  }

  /**
   * Unwraps the value, or returns a default value if the value is None.
   * @template D - The type of the default value.
   * @param defaultValue - The default value to return if the value is None.
   * @returns The unwrapped value or the default value.
   */
  unwrapOr<D>(defaultValue: D): T | D {
    return this.value;
  }

  /**
   * Maps the value to a new value.
   * @template M - The type of the mapped value.
   * @param fn - The mapping function.
   * @returns An Option containing the mapped value.
   */
  map<M>(fn: (value: T) => M): IOption<M> {
    return new Some(fn(this.value));
  }
}

/**
 * Represents the absence of a value.
 * @template T - The type that would have been contained in the option if it existed.
 */
export class None<T> {
  constructor() {
    Object.freeze(this);
  }

  /**
   * Checks if this instance is Some.
   * @returns False, indicating that this instance is not Some.
   */
  isSome(): this is Some<T> {
    return false;
  }
  /**
   * Checks if this instance is None.
   * @returns True, indicating that this instance is None.
   */
  isNone(): this is None<T> {
    return true;
  }

  /**
   * Unwraps the value. Throws an error indicating the value is None.
   * @param - Optional message to include in the error.
   * @throws Always throws an error indicating the value is None.
   */
  unwrap(message?: string): T {
    throw new Error(message ?? 'Cannot unwrap a None value.');
  }

  /**
   * Unwraps the value, or returns a default value if the value is None.
   * @template D - The type of the default value.
   * @param defaultValue - The default value to return if the value is None.
   * @returns The default value.
   */
  unwrapOr<D>(defaultValue: D): D {
    return defaultValue;
  }

  /**
   * Maps the value to a new value. Always returns None since there is no value to map.
   * @template M - The type of the mapped value.
   * @param fn - The mapping function.
   * @returns An instance of None.
   */
  map<M>(fn: (value: T) => M): IOption<M> {
    return new None<M>();
  }
}
