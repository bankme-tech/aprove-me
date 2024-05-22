export class BadRequest extends Error {
  constructor(message = 'You have done a bad request.') {
    super(message);
    this.name = 'BadRequest';
  }
}
