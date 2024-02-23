import { IErrorDomainService } from './error-domain-service.interface';

export class ErrorDomainService implements IErrorDomainService {
  private errors: string[] = [];
  private success: string[] = [];

  resetDomain(): void {
    this.errors = [];
    this.success = [];
  }

  addError(error: string): void {
    this.errors.push(error);
  }

  getErrors(): string[] {
    return this.errors;
  }

  getLastError(): string {
    console.log(this.errors);
    if (!this.errors.length) return null;

    return this.errors[this.errors.length - 1];
  }

  addSuccess(success: string): void {
    this.success.push(success);
  }

  getSuccesses(): string[] {
    return this.success;
  }

  getLastSuccess(): string {
    if (!this.success.length) return null;

    return this.success[this.success.length - 1];
  }
}
