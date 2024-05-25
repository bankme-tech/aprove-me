import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const formattedDate = new Date(createPayableDto.emissionDate);
    return this.prisma.payable.create({
      data: { ...createPayableDto, emissionDate: formattedDate },
    });
  }

  async findAll() {
    return this.prisma.payable.findMany();
  }

  async findOne(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });
    if (!payable) throw new NotFoundException('Payable not found');

    return payable;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    await this.findOne(id);

    return this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.payable.delete({
      where: { id },
    });
  }
}
