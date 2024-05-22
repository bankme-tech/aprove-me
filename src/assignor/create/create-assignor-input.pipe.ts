import { BadRequestException, PipeTransform } from "@nestjs/common";
import isEmail from "validator/lib/isEmail";

import { isBrazilianPhoneNumber } from "../../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../../validators/isCNPJ";
import { isCPF } from "../../validators/isCPF";
import { CreateAssignorInputDTO } from "./create-assignor-input.dto";

export class CreateAssignorInputPipe
  implements PipeTransform<unknown, CreateAssignorInputDTO>
{
  transform(value: unknown): CreateAssignorInputDTO {
    // validate value
    if (typeof value !== "object") {
      throw new BadRequestException("value must me an object");
    }

    if (value === null) {
      throw new BadRequestException("value cannot be null");
    }

    // validate value.document
    if (!("document" in value)) {
      throw new BadRequestException("document is required");
    }

    if (typeof value.document !== "string") {
      throw new BadRequestException("document must be a string");
    }

    if (value.document.length === 0) {
      throw new BadRequestException("document cannot be empty");
    }

    if (value.document.length > 30) {
      throw new BadRequestException("document must have 30 characters or less");
    }

    if (!isCPF(value.document) && !isCNPJ(value.document)) {
      throw new BadRequestException("document is not a valid CPF or CNPJ");
    }

    // validate value.email
    if (!("email" in value)) {
      throw new BadRequestException("email is required");
    }

    if (typeof value.email !== "string") {
      throw new BadRequestException("email must be a string");
    }

    if (value.email.length === 0) {
      throw new BadRequestException("email cannot be empty");
    }

    if (value.email.length > 140) {
      throw new BadRequestException("email must have 140 characters or less");
    }

    if (!isEmail(value.email)) {
      throw new BadRequestException("email is not a valid email");
    }

    // validate value.phone
    if (!("phone" in value)) {
      throw new BadRequestException("phone is required");
    }

    if (typeof value.phone !== "string") {
      throw new BadRequestException("phone must be a string");
    }

    if (value.phone.length === 0) {
      throw new BadRequestException("phone cannot be empty");
    }

    if (value.phone.length > 20)
      throw new BadRequestException("phone must have 20 characters or less");

    if (!isBrazilianPhoneNumber(value.phone))
      throw new BadRequestException(
        "phone must follow format: +55 (00) 0 0000-0000",
      );

    // validate value.name
    if (!("name" in value)) {
      throw new BadRequestException("name is required");
    }

    if (typeof value.name !== "string") {
      throw new BadRequestException("name must be a string");
    }

    if (value.name.length === 0) {
      throw new BadRequestException("name cannot be empty");
    }

    if (value.name.length > 140) {
      throw new BadRequestException("name must have 140 characters or less");
    }

    if (value.name.length !== value.name.trim().length) {
      throw new BadRequestException("name must be trimmed");
    }

    return new CreateAssignorInputDTO(
      value.document,
      value.email,
      value.phone,
      value.name,
    );
  }
}
