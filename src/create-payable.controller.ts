import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreatePayableOutputDTO } from "./dtos/create-payable-output.dto";
import { CreatePayableInputDTO } from "./dtos/create-payable-input.dto";
import { ValidationError } from "./errors/validation.error";

@Controller()
export class CreatePayableController {
  @Post("/integrations/payable")
  async handle(@Body() requestBody: unknown): Promise<CreatePayableOutputDTO> {
    try {
      const createPayableInputDTO = new CreatePayableInputDTO(requestBody);

      return new CreatePayableOutputDTO(
        createPayableInputDTO.id,
        createPayableInputDTO.value,
        createPayableInputDTO.emissionDate,
        createPayableInputDTO.assignor.id,
        createPayableInputDTO.assignor.document,
        createPayableInputDTO.assignor.email,
        createPayableInputDTO.assignor.phone,
        createPayableInputDTO.assignor.name,
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
