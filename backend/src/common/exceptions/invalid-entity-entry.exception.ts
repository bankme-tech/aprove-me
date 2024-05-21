export class InvalidEntityEntry extends Error {
  constructor(message = 'Invalid entity entry.') {
    super(message);
    this.name = 'InvalidEntityEntry';
  }
}
