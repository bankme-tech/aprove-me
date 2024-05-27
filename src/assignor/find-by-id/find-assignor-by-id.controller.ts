import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { Assignor } from "@prisma/client";

import { Auth } from "../../auth/auth.decorator";
import { FindAssignorByIdPipe } from "../find-assignor-by-id.pipe";

@Controller()
export class FindAssignorByIdController {
  @Auth()
  @Get("integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
  ) {
    return assignor;
  }
}
