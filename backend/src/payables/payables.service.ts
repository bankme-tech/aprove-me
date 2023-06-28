import { Injectable } from '@nestjs/common';
import { Payable, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) { }

  create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return this.prisma.payable.create({
      data
    });
  }

  async findAll() {
    return this.prisma.payable.findMany({
      select: {
        id: true,
        value: true,
        emissionDate: true
      }
    });
  }

  async findOne(payableWhereUniqueInput: Prisma.PayableWhereUniqueInput): Promise<Payable | null> {
    return await this.prisma.payable.findUnique({
      where: payableWhereUniqueInput,
      // include: {
      //   assignor: true
      // }
    });
  }

  async update(params: {
    where: Prisma.PayableWhereUniqueInput;
    data: Prisma.PayableUpdateInput;
  }): Promise<Payable> {
    const { where, data } = params;
    return this.prisma.payable.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.PayableWhereUniqueInput): Promise<Payable> {
    const payable = await this.prisma.payable.findFirst({
      where,
    });
    if (payable) {
      return this.prisma.payable.delete({
        where,
      });
    }
    return    
  }

  async checkIfExists(where: Prisma.PayableWhereUniqueInput): Promise<boolean> {
    const payable = await this.prisma.payable.findFirst({
      where,
      select: {
        id:true
      }
    });
    if (payable) {
      return true
    }
    return  false  
  }
}
