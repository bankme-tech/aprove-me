import { ServiceError } from "@/core/errors/service-error";

export class UserAlreadyExistsError extends Error implements ServiceError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`);
  }
}
