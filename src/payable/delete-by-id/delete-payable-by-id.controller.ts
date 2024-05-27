import { Controller, Delete, Param, ParseUUIDPipe } from "@nestjs/common";
import { Payable } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { PrismaProvider } from "../../providers/prisma.provider";
import { FindPayableByIdPipe } from "../find-payable-by-id.pipe";

@Controller()
export class DeletePayableByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Auth()
  @Delete("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
  ) {
    return await this.prisma.payable.delete({ where: { id: payable.id } });
  }
}
