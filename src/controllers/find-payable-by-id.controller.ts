import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Payable } from "@prisma/client";

import { FindPayableByIdOutputDTO } from "../dtos/find-payable-by-id-output.dto";
import { FindPayableByIdPipe } from "../pipes/find-payable-by-id.pipe";
import { PrismaProvider } from "../providers/prisma.provider";

@Controller()
export class FindPayableByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Get("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
  ) {
    return new FindPayableByIdOutputDTO(
      payable.id,
      payable.value,
      payable.emissionDate,
      payable.assignorId,
    );
  }
}
