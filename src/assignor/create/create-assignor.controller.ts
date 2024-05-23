import { Body, Controller, Post } from "@nestjs/common";

import { ZodPipe } from "../../pipes/zod.pipe";
import { PrismaProvider } from "../../providers/prisma.provider";
import { UpsertAssignorInputDTO } from "../upsert-assignor-input.dto";
import { UpsertAssignorInputSchema } from "../upsert-assignor-input.schema";

@Controller()
export class CreateAssignorController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Post("/integrations/assignor")
  async handle(
    @Body(new ZodPipe(UpsertAssignorInputSchema)) input: UpsertAssignorInputDTO,
  ) {
    const assignor = await this.prisma.assignor.create({
      data: {
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
    });

    return assignor;
  }
}
