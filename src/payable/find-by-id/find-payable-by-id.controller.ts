import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Payable } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { FindPayableByIdPipe } from "../find-payable-by-id.pipe";

@Controller()
export class FindPayableByIdController {
  @Auth()
  @Get("/integrations/payable/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindPayableByIdPipe) payable: Payable,
  ) {
    return payable;
  }
}
