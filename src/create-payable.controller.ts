import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreatePayableOutputDTO } from "./dtos/create-payable-output.dto";
import { CreatePayableInputDTO } from "./dtos/create-payable-input.dto";
import { ValidationError } from "./errors/validation.error";
import { PrismaProvider } from "./providers/prisma.provider";

@Controller()
export class CreatePayableController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Post("/integrations/payable")
  async handle(@Body() requestBody: unknown): Promise<CreatePayableOutputDTO> {
    try {
      const createPayableInputDTO = new CreatePayableInputDTO(requestBody);

      const upsertAssignorPromise = this.prisma.assignor.upsert({
        where: {
          id: createPayableInputDTO.assignor.id,
        },
        create: {
          id: createPayableInputDTO.assignor.id,
          document: createPayableInputDTO.assignor.document,
          email: createPayableInputDTO.assignor.email,
          phone: createPayableInputDTO.assignor.phone,
          name: createPayableInputDTO.assignor.name,
        },
        update: {
          document: createPayableInputDTO.assignor.document,
          email: createPayableInputDTO.assignor.email,
          phone: createPayableInputDTO.assignor.phone,
          name: createPayableInputDTO.assignor.name,
        },
      });

      const upsertPayablePromise = this.prisma.payable.upsert({
        where: {
          id: createPayableInputDTO.id,
        },
        create: {
          id: createPayableInputDTO.id,
          value: createPayableInputDTO.value,
          emissionDate: createPayableInputDTO.emissionDate,
          assignorId: createPayableInputDTO.assignor.id,
        },
        update: {
          value: createPayableInputDTO.value,
          emissionDate: createPayableInputDTO.emissionDate,
          assignorId: createPayableInputDTO.assignor.id,
        },
      });

      await this.prisma.$transaction([upsertAssignorPromise, upsertPayablePromise]);

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
