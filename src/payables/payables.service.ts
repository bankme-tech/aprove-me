import { Injectable, BadRequestException } from '@nestjs/common';
import { Recebivel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PayableDto } from './dtos/payable.dto';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async getAllPayables(): Promise<PayableDto[]> {
    return this.prisma.recebivel.findMany();
  }

  async getPayables(id: string): Promise<PayableDto> {
    return this.prisma.recebivel.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createPayable(dto: PayableDto): Promise<PayableDto> {
    return this.prisma.recebivel.create({
      data: dto,
    });
  }

  async updatePayable(id: string, dto: PayableDto): Promise<PayableDto> {
    return this.prisma.recebivel.update({
      data: dto,
      where: { id: id },
    });
  }

  async deletePayable(id: string): Promise<PayableDto> {
    return this.prisma.recebivel.delete({
      where: { id: id },
    });
  }
}
