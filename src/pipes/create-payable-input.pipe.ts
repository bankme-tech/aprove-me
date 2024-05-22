import { BadRequestException, PipeTransform } from "@nestjs/common";
import { isEmail, isISO8601, isUUID } from "validator";

import { CreatePayableInputDTO } from "../dtos/create-payable-input.dto";
import { isBrazilianPhoneNumber } from "../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../validators/isCNPJ";
import { isCPF } from "../validators/isCPF";

export class CreatePayableInputPipe
  implements PipeTransform<unknown, CreatePayableInputDTO>
{
  transform(input: unknown): CreatePayableInputDTO {
    // validate input
    if (typeof input !== "object") {
      throw new BadRequestException("input must me an object");
    }

    if (input === null) {
      throw new BadRequestException("input cannot be null");
    }

    // validate input.id
    if (!("id" in input)) {
      throw new BadRequestException("id is required");
    }

    if (typeof input.id !== "string") {
      throw new BadRequestException("id must be a string");
    }

    if (!isUUID(input.id)) {
      throw new BadRequestException("id is not a valid uuid");
    }

    // validate input.value
    if (!("value" in input)) {
      throw new BadRequestException("value is required");
    }

    if (typeof input.value !== "number") {
      throw new BadRequestException("value must be a number");
    }

    if (input.value < 0) {
      throw new BadRequestException("value must be greater or equal than 0");
    }

    // validate input.emissionDate
    if (!("emissionDate" in input)) {
      throw new BadRequestException("emissionDate is required");
    }

    if (typeof input.emissionDate !== "string") {
      throw new BadRequestException("emissionDate must be a string");
    }

    if (input.emissionDate.length === 0) {
      throw new BadRequestException("emissionDate cannot be empty");
    }

    if (!isISO8601(input.emissionDate)) {
      throw new BadRequestException("emissionDate is not a valid date");
    }

    // validate input.assignor
    if (!("assignor" in input)) {
      throw new BadRequestException("assignor is required");
    }

    if (typeof input.assignor !== "object") {
      throw new BadRequestException("assignor is not an object");
    }

    if (input.assignor === null) {
      throw new BadRequestException("assignor cannot be null");
    }

    // validate input.assignor.id
    if (!("id" in input.assignor)) {
      throw new BadRequestException("assignor.id is required");
    }

    if (typeof input.assignor.id !== "string") {
      throw new BadRequestException("assignor.id must be a string");
    }

    if (!isUUID(input.assignor.id)) {
      throw new BadRequestException("assignor.id is not a valid UUID");
    }

    // validate input.assignor.document
    if (!("document" in input.assignor)) {
      throw new BadRequestException("assignor.document is required");
    }

    if (typeof input.assignor.document !== "string") {
      throw new BadRequestException("assignor.document must be a string");
    }

    if (input.assignor.document.length === 0) {
      throw new BadRequestException("assignor.document cannot be empty");
    }

    if (input.assignor.document.length > 30) {
      throw new BadRequestException(
        "assignor.document must have 30 characters or less",
      );
    }

    if (!isCPF(input.assignor.document) && !isCNPJ(input.assignor.document)) {
      throw new BadRequestException(
        "assignor.document is not a valid CPF or CNPJ",
      );
    }

    // validate input.assignor.email
    if (!("email" in input.assignor)) {
      throw new BadRequestException("assignor.email is required");
    }

    if (typeof input.assignor.email !== "string") {
      throw new BadRequestException("assignor.email must be a string");
    }

    if (input.assignor.email.length === 0) {
      throw new BadRequestException("assignor.email cannot be empty");
    }

    if (input.assignor.email.length > 140) {
      throw new BadRequestException(
        "assignor.email must have 140 characters or less",
      );
    }

    if (!isEmail(input.assignor.email)) {
      throw new BadRequestException("assignor.email is not a valid email");
    }

    // validate input.assignor.phone
    if (!("phone" in input.assignor)) {
      throw new BadRequestException("assignor.phone is required");
    }

    if (typeof input.assignor.phone !== "string") {
      throw new BadRequestException("assignor.phone must be a string");
    }

    if (input.assignor.phone.length === 0) {
      throw new BadRequestException("assignor.phone cannot be empty");
    }

    if (input.assignor.phone.length > 20)
      throw new BadRequestException(
        "assignor.phone must have 20 characters or less",
      );

    if (!isBrazilianPhoneNumber(input.assignor.phone))
      throw new BadRequestException(
        "assignor.phone must follow format: +55 (00) 0 0000-0000",
      );

    // validate input.assignor.name
    if (!("name" in input.assignor)) {
      throw new BadRequestException("assignor.name is required");
    }

    if (typeof input.assignor.name !== "string") {
      throw new BadRequestException("assignor.name must be a string");
    }

    if (input.assignor.name.length === 0) {
      throw new BadRequestException("assignor.name cannot be empty");
    }

    if (input.assignor.name.length > 140) {
      throw new BadRequestException(
        "assignor.name must have 140 characters or less",
      );
    }

    if (input.assignor.name.length !== input.assignor.name.trim().length) {
      throw new BadRequestException("assignor.name must be trimmed");
    }

    return new CreatePayableInputDTO(
      input.id,
      input.value,
      new Date(input.emissionDate),
      input.assignor.id,
      input.assignor.document,
      input.assignor.email,
      input.assignor.phone,
      input.assignor.name,
    );
  }
}
