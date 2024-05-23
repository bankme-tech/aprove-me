export class ConflictResource extends Error {
  constructor(message = 'Already exists another resource.') {
    super(message);
    this.name = 'ConflictResource';
  }
}
