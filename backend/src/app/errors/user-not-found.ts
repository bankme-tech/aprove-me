import { ServerError } from './server-error';

export class UserNotFound extends ServerError {
  constructor(statusCode = 404) {
    super('user not found', statusCode);
  }
}
