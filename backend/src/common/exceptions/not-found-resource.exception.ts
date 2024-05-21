export class NotFoundResource extends Error {
  constructor(message = 'Resource not found.') {
    super(message);
    this.name = 'NotFoundResource';
  }
}
