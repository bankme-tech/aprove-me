import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { AssignorDTO } from "../assignor.dto";
import { FindAssignorByIdPipe } from "../find-by-id/find-assignor-by-id.pipe";

@Controller()
export class DeleteAssignorByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Delete("/integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
  ) {
    const numberOfPayables = await this.prisma.payable.count({
      where: { assignorId: assignor.id },
    });

    if (numberOfPayables > 0) {
      throw new BadRequestException(
        "you can only delete assignor if you delete all payables first",
      );
    }

    await this.prisma.assignor.delete({ where: { id: assignor.id } });
    return new AssignorDTO(assignor);
  }
}
