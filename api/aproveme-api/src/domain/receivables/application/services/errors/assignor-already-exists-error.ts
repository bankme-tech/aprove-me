import { ServiceError } from "@/core/errors/service-error";

export class AssignorAlreadyExistsError extends Error implements ServiceError {
  constructor(identifier: string) {
    super(`Assignor "${identifier}" already exists.`);
  }
}
