export interface IErrorDomainService {
  resetDomain(): void;
  addError(error: string): void;
  addSuccess(success: string): void;

  getLastError(): string;
  getErrors(): string[];

  getLastSuccess(): string;
  getSuccesses(): string[];
}
