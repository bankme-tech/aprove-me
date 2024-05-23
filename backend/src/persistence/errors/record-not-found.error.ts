export class RecordNotFoundError extends Error {
  constructor(record: string) {
    super(`${record} not found`);
    this.name = 'RecordNotFoundError';
  }
}
