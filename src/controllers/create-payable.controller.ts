import { BadRequestException, Body, Controller, Post } from "@nestjs/common";

import { CreatePayableInputDTO } from "../dtos/create-payable-input.dto";
import { CreatePayableOutputDTO } from "../dtos/create-payable-output.dto";
import { ValidationError } from "../errors/validation.error";
import { PrismaProvider } from "../providers/prisma.provider";

@Controller()
export class CreatePayableController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Post("/integrations/payable")
  async handle(@Body() requestBody: unknown): Promise<CreatePayableOutputDTO> {
    try {
      const input = new CreatePayableInputDTO(requestBody);

      const upsertAssignorPromise = this.prisma.assignor.upsert({
        where: {
          id: input.assignor.id,
        },
        create: {
          id: input.assignor.id,
          document: input.assignor.document,
          email: input.assignor.email,
          phone: input.assignor.phone,
          name: input.assignor.name,
        },
        update: {
          document: input.assignor.document,
          email: input.assignor.email,
          phone: input.assignor.phone,
          name: input.assignor.name,
        },
      });

      const upsertPayablePromise = this.prisma.payable.upsert({
        where: {
          id: input.id,
        },
        create: {
          id: input.id,
          value: input.value,
          emissionDate: input.emissionDate,
          assignorId: input.assignor.id,
        },
        update: {
          value: input.value,
          emissionDate: input.emissionDate,
          assignorId: input.assignor.id,
        },
      });

      await this.prisma.$transaction([
        upsertAssignorPromise,
        upsertPayablePromise,
      ]);

      return new CreatePayableOutputDTO(
        input.id,
        input.value,
        input.emissionDate,
        input.assignor.id,
        input.assignor.document,
        input.assignor.email,
        input.assignor.phone,
        input.assignor.name,
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
