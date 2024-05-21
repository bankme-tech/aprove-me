import { Err, Ok } from './../types/either';
import { Result } from 'src/types/either';
import { MONEY_EQUIVALENT_IN_CENTS } from './constants';
import { ZodError } from 'zod';
import { CustomError } from 'src/validations/errors';

export function get_env_var(name: string, defaultValue?: string) {
  const value = process.env[name];
  const is_devlopment = process.env.NODE_ENV === 'development';
  if (value === undefined) {
    if (!is_devlopment) {
      throw new Error(`${name} is not defined`);
    }
    return defaultValue;
  }
  return value;
}

export function to_cents(money: number): Result<Error, number> {
  if (typeof money !== 'number' || isNaN(money)) {
    return Err(new Error('O valor deve ser um número.'));
  }
  return Ok(Math.round(money * MONEY_EQUIVALENT_IN_CENTS));
}

export function to_money(cents: number): Result<Error, number> {
  if (typeof cents !== 'number' || isNaN(cents)) {
    return Err(new Error('O valor deve ser um número.'));
  }
  const money = (cents / MONEY_EQUIVALENT_IN_CENTS).toFixed(2);
  return Ok(Number(money));
}

export function is_internal_error(error: Error): boolean {
  if (error instanceof ZodError || error instanceof CustomError) {
    return true;
  }
  return false;
}
