import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './dto/create-integration.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  getPayableById(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  createPayable(createDto: CreatePayableDto) {
    return this.prisma.payable.create({
      data: createDto,
    });
  }

  async updatePayable(id: string, updateDto: UpdatePayableDto) {
    try {
      return await this.prisma.payable.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
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

  createAssignor(assignorDto: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: assignorDto,
    });
  }

  getAssignorById(id: string) {
    return this.prisma.assignor.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateAssignor(id: string, updateDto: UpdateAssignorDto) {
    try {
      return await this.prisma.assignor.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Assignor not found');
      }

      throw error;
    }
  }

  async deleteAssignor(id: string) {
    const assignor = await this.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
