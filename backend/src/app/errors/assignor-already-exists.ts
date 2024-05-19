import { ServerError } from './server-error';

export class AssignorAlreadyExists extends ServerError {
  constructor(statusCode = 400) {
    super('assignor already exists', statusCode);
  }
}
