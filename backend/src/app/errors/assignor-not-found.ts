import { ServerError } from './server-error';

export class AssignorNotFound extends ServerError {
  constructor(statusCode = 404) {
    super('assignor not found', statusCode);
  }
}
