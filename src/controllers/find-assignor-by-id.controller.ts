import { BadRequestException, Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { PrismaProvider } from "../providers/prisma.provider";
import { FindAssignorByIdOutputDTO } from "../dtos/find-assignor-by-id-output.dto";

@Controller()
export class FindAssignorByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Get("/integrations/assignor/:id")
  async handle(@Param("id", ParseUUIDPipe) id: string) {
    const assignor = await this.prisma.assignor.findUnique({ where: { id } });

    if (assignor === null) {
      throw new BadRequestException("assignor not found");
    }

    return new FindAssignorByIdOutputDTO(
      assignor.id,
      assignor.document,
      assignor.email,
      assignor.phone,
      assignor.name
    );
  }
}
