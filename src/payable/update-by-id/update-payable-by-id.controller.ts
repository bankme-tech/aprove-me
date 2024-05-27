import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import { Payable } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { ZodPipe } from "../../pipes/zod.pipe";
import { PrismaProvider } from "../../providers/prisma.provider";
import { FindPayableByIdPipe } from "../find-payable-by-id.pipe";
import { UpdatePayableByIdInputDTO } from "./update-payable-by-id-input.dto";
import { UpdatePayableByIdInputSchema } from "./update-payable-by-id-input.schema";

@Controller()
export class UpdatePayableByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Auth()
  @Put("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
    @Body(new ZodPipe(UpdatePayableByIdInputSchema))
    input: UpdatePayableByIdInputDTO,
  ) {
    if (input.assignorId !== payable.assignorId) {
      const assignor = await this.prisma.assignor.findUnique({
        where: { id: input.assignorId },
      });

      if (assignor === null) {
        throw new BadRequestException("assignor not found");
      }
    }

    return await this.prisma.payable.update({
      data: {
        value: input.value,
        emissionDate: input.emissionDate,
        assignorId: input.assignorId,
      },
      where: {
        id: payable.id,
      },
    });
  }
}
