import { PrismaService } from '../../database/prisma.service';
import { PayableRepo } from '../payable-repo';
import { PayableDto } from 'src/DTOs/payable';
import { Injectable } from '@nestjs/common';

@Injectable()
export class prismaPayableRepo implements PayableRepo {
  constructor(private prisma: PrismaService) {}

  async createPayable(body: PayableDto): Promise<PayableDto> {
    const { id, value, emissionDate, assignor } = body;
    const newReceived = await this.prisma.recebivel.create({
      data: {
        id,
        value,
        emissionDate: new Date(emissionDate),
        assignor,
      },
    });
    return newReceived;
  }

  async getPayableById(id: string): Promise<PayableDto> {
    const received = await this.prisma.recebivel.findUnique({
      where: {
        id,
      },
    });
    return received;
  }

  async getAllPayables(): Promise<PayableDto[]> {
    const received = await this.prisma.recebivel.findMany();
    return received;
  }

  async updatePayable(id: string, body: PayableDto): Promise<PayableDto> {
    const { value, emissionDate, assignor } = body;
    const updatedReceived = await this.prisma.recebivel.update({
      where: {
        id,
      },
      data: {
        value,
        emissionDate: new Date(emissionDate),
        assignor,
      },
    });
    return updatedReceived;
  }

  async deletePayable(id: string): Promise<void> {
    await this.prisma.recebivel.delete({
      where: {
        id,
      },
    });
  }
}
