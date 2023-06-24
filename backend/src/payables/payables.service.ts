import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Payable, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}
  
  create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return this.prisma.payable.create({
      data,
    });
  }

  findAll() {
    return `This action returns all payables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payable`;
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}
