import { describe, expect, it } from 'vitest';
import { IEither, left, right } from './either';

describe('Either', () => {
  it('should be right', () => {
    const result = right('123');
    expect(result.isRight());
  });

  it('should be left', () => {
    const result = left(new Error());
    expect(result.isLeft());
  });

  it('should not return the default value since the result is right', () => {
    const result = right('123').unwrapOr('456');
    expect(result).toBe('123');
  });

  it('should return the default value since the result is left', () => {
    const result = left(new Error()).unwrapOr('456');
    expect(result).toBe('456');
  });

  it('should map the result to a new value since the result is right', () => {
    const res = right('123').map((res) => +res);
    expect(res.isRight()).toBeTruthy();
    expect(res).toHaveProperty('value', 123);
  });

  it('should not map the result to a new value since the result is left', () => {
    let res: IEither<number | string, Error> = left(new Error());
    res = res.map((res) => res.toString());
    expect(res.isLeft()).toBeTruthy();
    expect(res).toHaveProperty('error');
  });

  it('should not throw an exception when unwrapping the result and it is right', () => {
    const result = right('123');
    expect(() => result.unwrap()).not.toThrowError();
    expect(result.unwrap()).toBe('123');
  });

  it('should throw an exception when unwrapping the result and it is left', () => {
    const result = left(new Error());
    expect(() => result.unwrap()).toThrowError();
  });
});
