import { ServerError } from './server-error';

export class PayableNotFound extends ServerError {
  constructor(statusCode = 404) {
    super('payable not found', statusCode);
  }
}
