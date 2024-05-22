import { Body, Controller, Post } from "@nestjs/common";

import { PrismaProvider } from "../../providers/prisma.provider";
import { AssignorDTO } from "../assignor.dto";
import { CreateAssignorInputDTO } from "./create-assignor-input.dto";
import { CreateAssignorInputPipe } from "./create-assignor-input.pipe";

@Controller()
export class CreateAssignorController {
  constructor(private readonly prisma: PrismaProvider) {}

  @Post("/integrations/assignor")
  async handle(@Body(CreateAssignorInputPipe) input: CreateAssignorInputDTO) {
    const assignor = await this.prisma.assignor.create({
      data: {
        document: input.document,
        email: input.email,
        phone: input.phone,
        name: input.name,
      },
    });

    return new AssignorDTO(assignor);
  }
}
