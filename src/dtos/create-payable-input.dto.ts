import { isEmail, isISO8601, isUUID } from "validator";

import { ValidationError } from "../errors/validation.error";
import { isBrazilianPhoneNumber } from "../validators/isBrazilianPhoneNumber";
import { isCNPJ } from "../validators/isCNPJ";
import { isCPF } from "../validators/isCPF";

class Assignor {
  readonly id: string;
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  constructor(
    id: string,
    document: string,
    email: string,
    phone: string,
    name: string,
  ) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.phone = phone;
    this.name = name;
  }
}

export class CreatePayableInputDTO {
  readonly id: string;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: Assignor;

  constructor(input: unknown) {
    // validate input
    if (typeof input !== "object") {
      throw new ValidationError("input must me an object");
    }

    if (input === null) {
      throw new ValidationError("input cannot be null");
    }

    // validate input.id
    if (!("id" in input)) {
      throw new ValidationError("id is required");
    }

    if (typeof input.id !== "string") {
      throw new ValidationError("id must be a string");
    }

    if (!isUUID(input.id)) {
      throw new ValidationError("id is not a valid uuid");
    }

    // validate input.value
    if (!("value" in input)) {
      throw new ValidationError("value is required");
    }

    if (typeof input.value !== "number") {
      throw new ValidationError("value must be a number");
    }

    if (input.value < 0) {
      throw new ValidationError("value must be greater or equal than 0");
    }

    // validate input.emissionDate
    if (!("emissionDate" in input)) {
      throw new ValidationError("emissionDate is required");
    }

    if (typeof input.emissionDate !== "string") {
      throw new ValidationError("emissionDate must be a string");
    }

    if (input.emissionDate.length === 0) {
      throw new ValidationError("emissionDate cannot be empty");
    }

    if (!isISO8601(input.emissionDate)) {
      throw new ValidationError("emissionDate is not a valid date");
    }

    // validate input.assignor
    if (!("assignor" in input)) {
      throw new ValidationError("assignor is required");
    }

    if (typeof input.assignor !== "object") {
      throw new ValidationError("assignor is not an object");
    }

    if (input.assignor === null) {
      throw new ValidationError("assignor cannot be null");
    }

    // validate input.assignor.id
    if (!("id" in input.assignor)) {
      throw new ValidationError("assignor.id is required");
    }

    if (typeof input.assignor.id !== "string") {
      throw new ValidationError("assignor.id must be a string");
    }

    if (!isUUID(input.assignor.id)) {
      throw new ValidationError("assignor.id is not a valid UUID");
    }

    // validate input.assignor.document
    if (!("document" in input.assignor)) {
      throw new ValidationError("assignor.document is required");
    }

    if (typeof input.assignor.document !== "string") {
      throw new ValidationError("assignor.document must be a string");
    }

    if (input.assignor.document.length === 0) {
      throw new ValidationError("assignor.document cannot be empty");
    }

    if (input.assignor.document.length > 30) {
      throw new ValidationError(
        "assignor.document must have 30 characters or less",
      );
    }

    if (!isCPF(input.assignor.document) && !isCNPJ(input.assignor.document)) {
      throw new ValidationError("assignor.document is not a valid CPF or CNPJ");
    }

    // validate input.assignor.email
    if (!("email" in input.assignor)) {
      throw new ValidationError("assignor.email is required");
    }

    if (typeof input.assignor.email !== "string") {
      throw new ValidationError("assignor.email must be a string");
    }

    if (input.assignor.email.length === 0) {
      throw new ValidationError("assignor.email cannot be empty");
    }

    if (input.assignor.email.length > 140) {
      throw new ValidationError(
        "assignor.email must have 140 characters or less",
      );
    }

    if (!isEmail(input.assignor.email)) {
      throw new ValidationError("assignor.email is not a valid email");
    }

    // validate input.assignor.phone
    if (!("phone" in input.assignor)) {
      throw new ValidationError("assignor.phone is required");
    }

    if (typeof input.assignor.phone !== "string") {
      throw new ValidationError("assignor.phone must be a string");
    }

    if (input.assignor.phone.length === 0) {
      throw new ValidationError("assignor.phone cannot be empty");
    }

    if (input.assignor.phone.length > 20)
      throw new ValidationError(
        "assignor.phone must have 20 characters or less",
      );

    if (!isBrazilianPhoneNumber(input.assignor.phone))
      throw new ValidationError(
        "assignor.phone must follow format: +55 (00) 0 0000-0000",
      );

    // validate input.assignor.name
    if (!("name" in input.assignor)) {
      throw new ValidationError("assignor.name is required");
    }

    if (typeof input.assignor.name !== "string") {
      throw new ValidationError("assignor.name must be a string");
    }

    if (input.assignor.name.length === 0) {
      throw new ValidationError("assignor.name cannot be empty");
    }

    if (input.assignor.name.length > 140) {
      throw new ValidationError(
        "assignor.name must have 140 characters or less",
      );
    }

    if (input.assignor.name.length !== input.assignor.name.trim().length) {
      throw new ValidationError("assignor.name must be trimmed");
    }

    this.id = input.id;
    this.value = input.value;
    this.emissionDate = new Date(input.emissionDate);

    this.assignor = new Assignor(
      input.assignor.id,
      input.assignor.document,
      input.assignor.email,
      input.assignor.phone,
      input.assignor.name,
    );
  }
}
