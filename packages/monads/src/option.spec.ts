import { describe, expect, it } from 'vitest';
import { some, none, IOption } from './option';

describe('Option', () => {
  it('should be some', () => {
    const result = some('123');
    expect(result.isSome());
  });

  it('should be none', () => {
    const result = none();
    expect(result.isNone());
  });

  it('should not return the default value since the result is some', () => {
    const result = some('123').unwrapOr('456');
    expect(result).toBe('123');
  });

  it('should return the default value since the result is none', () => {
    const result = none().unwrapOr('456');
    expect(result).toBe('456');
  });

  it('should map the result to a new value since the result is some', () => {
    const res = some('123').map((res) => +res);
    expect(res.isSome()).toBeTruthy();
    expect(res).toHaveProperty('value', 123);
  });

  it('should not map the result to a new value since the result is none', () => {
    let res: IOption<number | string> = none();
    res = res.map((res) => res.toString());
    expect(res.isNone()).toBeTruthy();
    expect(res).not.toHaveProperty('value');
  });

  it('should not throw an exception when unwrapping the result and it is some', () => {
    const result = some('123');
    expect(() => result.unwrap()).not.toThrowError();
    expect(result.unwrap()).toBe('123');
  });

  it('should throw an exception when unwrapping the result and it is none', () => {
    const result = none();
    expect(() => result.unwrap()).toThrowError();
  });
});
