import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import PayableRepository from './payableRepository';

import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { UpdatePayableDto } from '../dto/update-payable.dto';

@Injectable()
export class PrismaPayableRepository extends PayableRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    const { value, assignorId } = createPayableDto;
    return await this.prisma.payable.create({
      data: {
        value,
        assignorId,
      },
    });
  }

  async findOne(id: string): Promise<Payable> {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany({ take: 100 });
  }

  async update(id: string, updatePayableDto: UpdatePayableDto): Promise<Payable> {
    const { value, assignorId } = updatePayableDto;
    return this.prisma.payable.update({
      where: { id },
      data: { value, assignorId },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({ where: { id } });
  }
}
