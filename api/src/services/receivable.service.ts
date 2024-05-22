import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Receivable, Prisma } from '@prisma/client';

@Injectable()
export class ReceivableService {
  constructor(private prisma: PrismaService) { }

  async receivable(
    receivableWhereUniqueInput: Prisma.ReceivableWhereUniqueInput
  ): Promise<Receivable | null> {
    return this.prisma.receivable.findUnique({
      where: receivableWhereUniqueInput,
      select: {
        id: true,
        value: true,
        emissionDate: true,
        assignor: true,
        assignorRef: {
          select: {
            name: true
          }
        }
      },
    });
  } 

  async receivables(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReceivableWhereUniqueInput;
    where?: Prisma.ReceivableWhereInput;
    orderBy?: Prisma.ReceivableOrderByWithRelationInput;
  }): Promise<Receivable[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.receivable.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        value: true,
        emissionDate: true,
        assignor: true,
        assignorRef: {
          select: {
            name: true
          }
        }
      },
    },
  );
  }

  async createReceivable(data: Prisma.ReceivableCreateInput): Promise<Receivable> {
    return this.prisma.receivable.create({
      data,
    });
  }

  async updateReceivable(params: {
    where: Prisma.ReceivableWhereUniqueInput;
    data: Prisma.ReceivableUpdateInput;
  }): Promise<Receivable> {
    const { where, data } = params;
    return this.prisma.receivable.update({
      data,
      where,
    });
  }

  async deleteReceivable(where: Prisma.ReceivableWhereUniqueInput): Promise<Receivable> {
    return await this.prisma.receivable.delete({
      where,
    });
  }

}