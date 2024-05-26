import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private prisma: PrismaService) {}

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

  async getAssignors() {
    return this.prisma.assignor.findMany();
  }
}
