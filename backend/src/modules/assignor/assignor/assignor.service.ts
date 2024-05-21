import { Injectable } from '@nestjs/common';
import { Assignor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async createAssignor(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return await this.prisma.assignor.create({
      data,
    });
  }

  async findOneAssignor(
    data: Prisma.AssignorFindUniqueArgs,
  ): Promise<Assignor> {
    return await this.prisma.assignor.findUnique(data);
  }
}
