import { BadRequestException, PipeTransform } from "@nestjs/common";

import { ValidationError } from "../errors/validation.error";

export class InputDTOPipe<T> implements PipeTransform<unknown, T> {
  private readonly InputDTO: { new (input: unknown): T };

  constructor(InputDTO: { new (input: unknown): T }) {
    this.InputDTO = InputDTO;
  }

  transform(value: unknown): T {
    try {
      return new this.InputDTO(value);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
