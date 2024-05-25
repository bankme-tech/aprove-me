import { DomainError } from './DomainError';

export class UnprocessableEntity extends DomainError {
  constructor(message?: string) {
    super('UNPROCESSABLE_ENTITY', message);
  }
}
