export class DomainError extends Error {
  public readonly name: string;

  constructor(name: string, message?: string) {
    super(message);
    this.name = name;
  }
}
