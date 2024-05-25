import { Left } from './Left';
import { Right } from './Right';

export type Either<T, U> = Left<T> | Right<U>;
