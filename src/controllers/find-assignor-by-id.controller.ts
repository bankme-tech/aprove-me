import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import type { Assignor } from "@prisma/client";

import { FindAssignorByIdOutputDTO } from "../dtos/find-assignor-by-id-output.dto";
import { FindAssignorByIdPipe } from "../pipes/find-assignor-by-id.pipe";
import { PrismaProvider } from "../providers/prisma.provider";

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
