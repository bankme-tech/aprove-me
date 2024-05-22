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
import { PrismaProvider } from "../providers/prisma.provider";
import { InputDTOPipe } from "../utils/input-dto.pipe";

@Controller()
export class UpdatePayableByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Put("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new InputDTOPipe(UpdatePayableByIdInputDTO))
    input: UpdatePayableByIdInputDTO,
  ) {
    const payable = await this.prisma.payable.findUnique({ where: { id } });

    if (payable === null) {
      throw new BadRequestException("payable not found");
    }

    if (input.assignorId !== payable.assignorId) {
      const assignor = await this.prisma.payable.findUnique({
        where: { id },
      });

      if (assignor === null) {
        throw new BadRequestException("assignor not found");
      }
    }

    await this.prisma.payable.update({
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
      id,
      input.value,
      input.emissionDate,
      input.assignorId,
    );
  }
}
