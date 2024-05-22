import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { PrismaProvider } from "../../providers/prisma.provider";
import { FindAssignorByIdPipe } from "./find-assignor-by-id.pipe";
import { FindAssignorByIdOutputDTO } from "./find-assignor-by-id-output.dto";

@Controller()
export class FindAssignorByIdController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Get("/integrations/assignor/:id")
  async handle(
    @Param("id", ParseUUIDPipe, FindAssignorByIdPipe) assignor: Assignor,
  ) {
    return new FindAssignorByIdOutputDTO(
      assignor.id,
      assignor.document,
      assignor.email,
      assignor.phone,
      assignor.name,
    );
  }
}
