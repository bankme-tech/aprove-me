import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";

import { UpdatePayableByIdInputDTO } from "../dtos/update-payable-by-id-input.dto";
import { UpdatePayableByIdOutputDTO } from "../dtos/update-payable-by-id-output.dto";
import { ValidationError } from "../errors/validation.error";
import { PrismaProvider } from "../providers/prisma.provider";

@Controller()
export class UpdatePayableByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Put("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() requestBody: unknown,
  ) {
    try {
      const payable = await this.prisma.payable.findUnique({ where: { id } });

      if (payable === null) {
        throw new BadRequestException("payable not found");
      }

      const input = new UpdatePayableByIdInputDTO(requestBody);

      const updatedPayable = await this.prisma.payable.update({
        data: {
          value: input.value,
          emissionDate: input.emissionDate,
          assignorId: input.assignorId,
        },
        where: {
          id,
        },
      });

      return new UpdatePayableByIdOutputDTO(
        updatedPayable.id,
        updatedPayable.value,
        updatedPayable.emissionDate,
        updatedPayable.assignorId,
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
