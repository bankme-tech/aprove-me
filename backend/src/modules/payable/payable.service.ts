import { Injectable } from '@nestjs/common';
import { Payable, Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.PayableCreateInput): Promise<Payable> {
    return this.prisma.payable.create({
      data,
    });
  }
}
