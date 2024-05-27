import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { PrismaProvider } from "../providers/prisma.provider";

@Injectable()
export class PermissionPipe implements PipeTransform<string> {
  constructor(private readonly prisma: PrismaProvider) {}

  async transform(value: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id: value },
    });

    if (permission === null) {
      throw new BadRequestException("permission not found");
    }

    return permission;
  }
}
