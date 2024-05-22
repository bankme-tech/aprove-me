import { UseCaseError } from "src/core/erros/use-case-error";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found.')
  }
}