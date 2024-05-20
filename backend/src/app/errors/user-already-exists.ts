import { ServerError } from './server-error';

export class UserAlreadyExists extends ServerError {
  constructor(statusCode = 400) {
    super('user already exists', statusCode);
  }
}
