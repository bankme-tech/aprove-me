import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import type { Payable } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { FindPayableByIdPipe } from "../find-by-id/find-payable-by-id.pipe";
import { UpdatePayableByIdInputDTO } from "./update-payable-by-id-input.dto";
import { UpdatePayableByIdInputPipe } from "./update-payable-by-id-input.pipe";
import { UpdatePayableByIdOutputDTO } from "./update-payable-by-id-output.dto";

@Controller()
export class UpdatePayableByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Put("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
    @Body(UpdatePayableByIdInputPipe) input: UpdatePayableByIdInputDTO,
  ) {
    if (input.assignorId !== payable.assignorId) {
      const assignor = await this.prisma.payable.findUnique({
        where: { id: payable.assignorId },
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
        id: payable.id,
      },
    });

    return new UpdatePayableByIdOutputDTO(
      payable.id,
      input.value,
      input.emissionDate,
      input.assignorId,
    );
  }
}
