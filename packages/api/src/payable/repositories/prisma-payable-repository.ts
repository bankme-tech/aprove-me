import { Injectable } from '@nestjs/common';
import { Payable } from '../entities/payable.entity';
import { PrismaService } from '@database/prisma.service';
import { PayableRepository } from './payable-repository';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { UpdatePayableDto } from '@payable/dto/update-payable.dto';

@Injectable()
export default class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }

  async findById(id: string): Promise<Payable> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({ where: { id } });
  }

  async update(id: string, updatePayableDto: UpdatePayableDto): Promise<Payable> {
    return this.prisma.payable.update({ where: { id }, data: updatePayableDto });
  }

  async create({ value, assignorId }: CreatePayableDto): Promise<Payable> {
    return await this.prisma.payable.create({
      data: {
        value,
        assignorId,
      },
    });
  }
}
