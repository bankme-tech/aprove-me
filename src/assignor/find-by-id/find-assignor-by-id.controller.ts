import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { FindAssignorByIdPipe } from "../find-assignor-by-id.pipe";

@Controller()
export class FindAssignorByIdController {
  @Get("/integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
  ) {
    return assignor;
  }
}
