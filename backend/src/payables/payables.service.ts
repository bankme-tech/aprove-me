import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}

  getPayableById(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async createPayable(createDto: CreatePayableDto) {
    const res = await validateDto(createDto, CreatePayableDto);

    return this.prisma.payable.create({
      data: res,
    });
  }

  async updatePayable(id: string, updateDto: UpdatePayableDto) {
    const result = await validateDto(updateDto, UpdatePayableDto);

    try {
      return await this.prisma.payable.update({
        where: { id },
        data: result,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Payable not found');
      }
      throw error;
    }
  }

  async deletePayable(id: string) {
    const payable = await this.getPayableById(id);

    if (!payable) throw new NotFoundException('Payable not found');

    return this.prisma.payable.delete({
      where: { id },
    });
  }
}
