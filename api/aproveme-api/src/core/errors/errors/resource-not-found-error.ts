import { ServiceError } from "@/core/errors/service-error";

export class ResourceNotFoundError extends Error implements ServiceError {
  constructor() {
    super("Resource not found.");
  }
}
