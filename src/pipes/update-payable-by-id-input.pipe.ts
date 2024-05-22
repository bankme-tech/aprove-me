import { BadRequestException, PipeTransform } from "@nestjs/common";
import { isISO8601, isUUID } from "validator";

import { UpdatePayableByIdInputDTO } from "../dtos/update-payable-by-id-input.dto";

export class UpdatePayableByIdInputPipe
  implements PipeTransform<unknown, UpdatePayableByIdInputDTO>
{
  transform(value: unknown): UpdatePayableByIdInputDTO {
    // validate input
    if (typeof value !== "object") {
      throw new BadRequestException("value must me an object");
    }

    if (value === null) {
      throw new BadRequestException("value cannot be null");
    }

    // validate value.value
    if (!("value" in value)) {
      throw new BadRequestException("value is required");
    }

    if (typeof value.value !== "number") {
      throw new BadRequestException("value must be a number");
    }

    if (value.value < 0) {
      throw new BadRequestException("value must be greater or equal than 0");
    }

    // validate value.emissionDate
    if (!("emissionDate" in value)) {
      throw new BadRequestException("emissionDate is required");
    }

    if (typeof value.emissionDate !== "string") {
      throw new BadRequestException("emissionDate must be a string");
    }

    if (value.emissionDate.length === 0) {
      throw new BadRequestException("emissionDate cannot be empty");
    }

    if (!isISO8601(value.emissionDate)) {
      throw new BadRequestException("emissionDate is not a valid date");
    }

    // validate value.assignorId
    if (!("assignorId" in value)) {
      throw new BadRequestException("assignorId is required");
    }

    if (typeof value.assignorId !== "string") {
      throw new BadRequestException("assignorId must be a string");
    }

    if (!isUUID(value.assignorId)) {
      throw new BadRequestException("assignorId is not a valid UUID");
    }

    return new UpdatePayableByIdInputDTO(
      value.value,
      new Date(value.emissionDate),
      value.assignorId,
    );
  }
}
