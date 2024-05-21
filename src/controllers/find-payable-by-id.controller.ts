import { BadRequestException, Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { PrismaProvider } from "../providers/prisma.provider";
import { FindPayableByIdOutputDTO } from "../dtos/find-payable-by-id-output.dto";

@Controller()
export class FindPayableByIdController {
  private readonly prisma: PrismaProvider;

  constructor(prisma: PrismaProvider) {
    this.prisma = prisma;
  }

  @Get("/integrations/payable/:id")
  async handle(@Param("id", ParseUUIDPipe) id: string) {
    const payable = await this.prisma.payable.findUnique({ where: { id } });

    if (payable === null) {
      throw new BadRequestException("payable not found");
    }

    return new FindPayableByIdOutputDTO(
      payable.id,
      payable.value,
      payable.emissionDate
    );
  }
}
