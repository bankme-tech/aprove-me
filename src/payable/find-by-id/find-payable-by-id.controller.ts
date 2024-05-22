import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Payable } from "@prisma/client";

import { PayableDTO } from "../payable.dto";
import { FindPayableByIdPipe } from "./find-payable-by-id.pipe";

@Controller()
export class FindPayableByIdController {
  @Get("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
  ) {
    return new PayableDTO(payable);
  }
}
