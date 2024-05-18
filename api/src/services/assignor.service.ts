import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Assignor, Prisma } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) { }

  async assignor(
    assignorWhereUniqueInput: Prisma.AssignorWhereUniqueInput
  ): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({
      where: assignorWhereUniqueInput,
    });
  }

  async assignors(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AssignorWhereUniqueInput;
    where?: Prisma.AssignorWhereInput;
    orderBy?: Prisma.AssignorOrderByWithRelationInput;
  }): Promise<Assignor[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.assignor.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAssignor(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.prisma.assignor.create({
      data,
    });
  }

  async updateAssignor(params: { 
    where: Prisma.AssignorWhereUniqueInput; 
    data: Prisma.AssignorUpdateInput; 
  }): Promise<Assignor> {
    const { where, data } = params;
    return this.prisma.assignor.update({
      data,
      where,
    });
  }

  async deleteAssignor(where: Prisma.AssignorWhereUniqueInput): Promise<Assignor> {
    return this.prisma.assignor.delete({
      where,
    });
  }

  async findByDocument(
    document: string
  ): Promise<Assignor | null> {
    return this.prisma.assignor.findFirst({
      where: {
        document
      },
    });
  }
}