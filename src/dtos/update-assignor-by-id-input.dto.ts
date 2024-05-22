import { isEmail } from "validator";

import { ValidationError } from "../errors/validation.error";
import { isBrazilianPhoneNumber } from "../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../validators/isCNPJ";
import { isCPF } from "../validators/isCPF";

export class UpdateAssignorByIdInputDTO {
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  constructor(input: unknown) {
    // validate input
    if (typeof input !== "object") {
      throw new ValidationError("input must me an object");
    }

    if (input === null) {
      throw new ValidationError("input cannot be null");
    }

    // validate input.document
    if (!("document" in input)) {
      throw new ValidationError("document is required");
    }

    if (typeof input.document !== "string") {
      throw new ValidationError("document must be a string");
    }

    if (input.document.length === 0) {
      throw new ValidationError("document cannot be empty");
    }

    if (input.document.length > 30) {
      throw new ValidationError("document must have 30 characters or less");
    }

    if (!isCPF(input.document) && !isCNPJ(input.document)) {
      throw new ValidationError("document is not a valid CPF or CNPJ");
    }

    // validate input.email
    if (!("email" in input)) {
      throw new ValidationError("email is required");
    }

    if (typeof input.email !== "string") {
      throw new ValidationError("email must be a string");
    }

    if (input.email.length === 0) {
      throw new ValidationError("email cannot be empty");
    }

    if (input.email.length > 140) {
      throw new ValidationError("email must have 140 characters or less");
    }

    if (!isEmail(input.email)) {
      throw new ValidationError("email is not a valid email");
    }

    // validate input.phone
    if (!("phone" in input)) {
      throw new ValidationError("phone is required");
    }

    if (typeof input.phone !== "string") {
      throw new ValidationError("phone must be a string");
    }

    if (input.phone.length === 0) {
      throw new ValidationError("phone cannot be empty");
    }

    if (input.phone.length > 20)
      throw new ValidationError("phone must have 20 characters or less");

    if (!isBrazilianPhoneNumber(input.phone))
      throw new ValidationError(
        "phone must follow format: +55 (00) 0 0000-0000",
      );

    // validate input.name
    if (!("name" in input)) {
      throw new ValidationError("name is required");
    }

    if (typeof input.name !== "string") {
      throw new ValidationError("name must be a string");
    }

    if (input.name.length === 0) {
      throw new ValidationError("name cannot be empty");
    }

    if (input.name.length > 140) {
      throw new ValidationError("name must have 140 characters or less");
    }

    if (input.name.length !== input.name.trim().length) {
      throw new ValidationError("name must be trimmed");
    }

    this.document = input.document;
    this.email = input.email;
    this.phone = input.phone;
    this.name = input.name;
  }
}
