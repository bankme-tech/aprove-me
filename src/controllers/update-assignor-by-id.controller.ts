import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from "@nestjs/common";

import { UpdateAssignorByIdInputDTO } from "../dtos/update-assignor-by-id-input.dto";
import { UpdateAssignorByIdOutputDTO } from "../dtos/update-assignor-by-id-output.dto";
import { ValidationError } from "../errors/validation.error";
import { PrismaProvider } from "../providers/prisma.provider";

@Controller()
export class UpdateAssignorByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Put("integrations/assignor/:id")
  async handle(@Param("id") id: string, @Body() requestBody: unknown) {
    try {
      const assignor = await this.prisma.assignor.findUnique({ where: { id } });

      if (assignor === null) {
        throw new BadRequestException("assignor not found");
      }

      const input = new UpdateAssignorByIdInputDTO(requestBody);

      await this.prisma.assignor.update({
        data: {
          document: input.document,
          email: input.email,
          phone: input.phone,
          name: input.name,
        },
        where: {
          id,
        },
      });

      return new UpdateAssignorByIdOutputDTO(
        id,
        input.document,
        input.email,
        input.phone,
        input.name,
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
