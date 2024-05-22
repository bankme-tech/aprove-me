import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { PrismaProvider } from "../../providers/prisma.provider";

@Injectable()
export class FindPayableByIdPipe implements PipeTransform<string> {
  constructor(private readonly prisma: PrismaProvider) {}

  async transform(value: string) {
    const payable = await this.prisma.payable.findUnique({
      where: { id: value },
    });

    if (payable === null) {
      throw new BadRequestException("payable not found");
    }

    return payable;
  }
}
