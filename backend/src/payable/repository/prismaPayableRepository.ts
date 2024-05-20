import { PrismaService } from 'src/database/prisma.service';
import PayableRepository from './payableRepository';
import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { Payable } from '@prisma/client';
import { UpdatePayableDto } from '../dto/update-payable.dto';

@Injectable()
export class PrismaPayableRepository extends PayableRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    const { assignorId, value } = createPayableDto;

    return await this.prisma.payable.create({
      data: {
        assignorId,
        value,
      },
    });
  }

  async findAll(): Promise<Payable[]> {
    return await this.prisma.payable.findMany();
  }

  // verificar se vai ficar assim

  async findOne(id: string): Promise<Payable> {
    return await this.prisma.payable.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
    return await this.prisma.payable.update({
      where: {
        id,
      },
      data: updatePayableDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }
}
