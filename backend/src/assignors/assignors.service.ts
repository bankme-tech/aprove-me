import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Assignor, Prisma } from '@prisma/client';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) { }

  create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.prisma.assignor.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.assignor.findMany({
      include: {
        payables: true,
      },
    });
  }

  async findOne(assignorWhereUniqueInput: Prisma.AssignorWhereUniqueInput): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({
      where: assignorWhereUniqueInput,
      include: {
        payables: true,
      },
    });
  }

  async update(params: {
    where: Prisma.AssignorWhereUniqueInput;
    data: Prisma.AssignorUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.assignor.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AssignorWhereUniqueInput): Promise<Assignor> {
    return this.prisma.assignor.delete({
      where,
    });
  }
}
