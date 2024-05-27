import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { Assignor } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { PrismaProvider } from "../../providers/prisma.provider";
import { FindAssignorByIdPipe } from "../find-assignor-by-id.pipe";

@Controller()
export class DeleteAssignorByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Auth()
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

    return await this.prisma.assignor.delete({ where: { id: assignor.id } });
  }
}
