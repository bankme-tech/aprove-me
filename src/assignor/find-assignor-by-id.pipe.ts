import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { PrismaProvider } from "../providers/prisma.provider";

@Injectable()
export class FindAssignorByIdPipe implements PipeTransform<string> {
  constructor(private readonly prisma: PrismaProvider) {}

  async transform(value: string) {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id: value },
    });

    if (assignor === null) {
      throw new BadRequestException("assignor not found");
    }

    return assignor;
  }
}
