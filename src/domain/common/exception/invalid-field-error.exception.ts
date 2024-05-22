export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`Invalid Field: ${field}.`);
    this.name = 'InvalidFieldError';
  }
}
