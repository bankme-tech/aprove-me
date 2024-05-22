import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './dto/create-integration.dto';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from './../utils';

@Injectable()
export class IntegrationsService {
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

  async createAssignor(assignorDto: CreateAssignorDto) {
    const res = await validateDto(assignorDto, CreateAssignorDto);
    return this.prisma.assignor.create({
      data: res,
    });
  }

  getAssignorById(id: string) {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async updateAssignor(id: string, updateDto: UpdateAssignorDto) {
    const res = await validateDto(updateDto, UpdateAssignorDto);

    const assignor = await this.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return await this.prisma.assignor.update({
      where: { id },
      data: res,
    });
  }

  async deleteAssignor(id: string) {
    const assignor = await this.getAssignorById(id);

    if (!assignor) throw new NotFoundException('Assignor not found');

    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
