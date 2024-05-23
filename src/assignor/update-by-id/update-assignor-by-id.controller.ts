import { Body, Controller, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { ZodPipe } from "../../pipes/zod.pipe";
import { PrismaProvider } from "../../providers/prisma.provider";
import { FindAssignorByIdPipe } from "../find-assignor-by-id.pipe";
import { UpsertAssignorInputDTO } from "../upsert-assignor-input.dto";
import { UpsertAssignorInputSchema } from "../upsert-assignor-input.schema";

@Controller()
export class UpdateAssignorByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Put("integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
    @Body(new ZodPipe(UpsertAssignorInputSchema))
    input: UpsertAssignorInputDTO,
  ) {
    return await this.prisma.assignor.update({
      data: {
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
      where: {
        id: assignor.id,
      },
    });
  }
}
