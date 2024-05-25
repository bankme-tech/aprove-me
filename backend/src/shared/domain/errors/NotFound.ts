import { DomainError } from './DomainError';

export class NotFound extends DomainError {
  constructor(message?: string) {
    super('NOT_FOUND', message);
  }
}
