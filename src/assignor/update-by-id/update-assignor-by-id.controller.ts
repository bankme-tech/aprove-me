import { Body, Controller, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { AssignorDTO } from "../assignor.dto";
import { FindAssignorByIdPipe } from "../find-by-id/find-assignor-by-id.pipe";
import { UpdateAssignorByIdInputDTO } from "./update-assignor-by-id-input.dto";
import { UpdateAssignorByIdInputPipe } from "./update-assignor-by-id-input.pipe";

@Controller()
export class UpdateAssignorByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Put("integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
    @Body(UpdateAssignorByIdInputPipe)
    input: UpdateAssignorByIdInputDTO,
  ) {
    await this.prisma.assignor.update({
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

    return new AssignorDTO({
      id: assignor.id,
      document: input.document,
      email: input.email,
      phone: input.phone,
      name: input.name,
    });
  }
}
