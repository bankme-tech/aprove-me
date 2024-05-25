export class ReferencedRecordError extends Error {
  constructor(record: string) {
    super(
      `${record} is being referenced by another record and cannot be removed`,
    );
    this.name = 'ReferencedRecordError';
  }
}
