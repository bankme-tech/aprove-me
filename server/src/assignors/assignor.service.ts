import { Injectable, BadRequestException } from '@nestjs/common';
import { Cedente, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AssignorDto } from './dtos/assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async getAllAssignors(): Promise<AssignorDto[]> {
    return this.prisma.cedente.findMany();
  }

  async getAssignor(id: string): Promise<AssignorDto> {
    return this.prisma.cedente.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createAssignor(dto: AssignorDto): Promise<AssignorDto> {
    return this.prisma.cedente.create({
      data: dto,
    });
  }

  async updateAssignor(id: string, dto: AssignorDto): Promise<AssignorDto> {
    return this.prisma.cedente.update({
      data: dto,
      where: { id: id },
    });
  }

  async deleteAssignor(id: string): Promise<AssignorDto> {
    return this.prisma.cedente.delete({
      where: { id: id },
    });
  }
}
