import { isISO8601, isUUID } from "validator";
import { ValidationError } from "../errors/validation.error";

export class UpdatePayableByIdInputDTO {
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignorId: string;

  constructor(input: unknown) {
    // validate input
    if (typeof input !== "object") throw new ValidationError("input must me an object");
    if (input === null) throw new ValidationError("input cannot be null");

    // validate input.value
    if (!("value" in input)) throw new ValidationError("value is required");
    if (typeof input.value !== "number") throw new ValidationError("value must be a number");
    if (input.value < 0) throw new ValidationError("value must be greater or equal than 0");

    // validate input.emissionDate
    if (!("emissionDate" in input)) throw new ValidationError("emissionDate is required");
    if (typeof input.emissionDate !== "string") throw new ValidationError("emissionDate must be a string");
    if (input.emissionDate.length === 0) throw new ValidationError("emissionDate cannot be empty");
    if (!isISO8601(input.emissionDate)) throw new ValidationError("emissionDate is not a valid date");

    // validate input.assignorId
    if (!("assignorId" in input)) throw new ValidationError("assignorId is required");
    if (typeof input.assignorId !== "string") throw new ValidationError("assignorId must be a string");
    if (!isUUID(input.assignorId)) throw new ValidationError("assignorId is not a valid UUID");

    this.value = input.value;
    this.emissionDate = new Date(input.emissionDate);
    this.assignorId = input.assignorId;
  }
}
