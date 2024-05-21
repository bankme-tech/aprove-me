import { Injectable } from '@nestjs/common';

import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { UpdatePayableDto } from '../dto/update-payable.dto';
import PayableRepository from './payable.repository';
import { PrismaService } from 'src/prisma/prisma.service';

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
      include: { assignor: true },
    });
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany({ take: 50 });
  }

  async update(
    id: string,
    updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
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
