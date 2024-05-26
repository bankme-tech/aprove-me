import { Controller, Delete, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Payable } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { FindPayableByIdPipe } from "../find-payable-by-id.pipe";

@Controller()
export class DeletePayableByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Delete("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
  ) {
    return await this.prisma.payable.delete({ where: { id: payable.id } });
  }
}
