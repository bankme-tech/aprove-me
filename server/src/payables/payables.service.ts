import { Injectable, Inject } from '@nestjs/common';
import { Recebivel, Prisma } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma.service';
import { PayableDto } from './dtos/payable.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PayableService {
  constructor(
    private prisma: PrismaService,
    @Inject('PAYABLE') private client: ClientProxy,
  ) {}

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

  async createPayableBatch(dto: PayableDto): Promise<PayableDto> {
    try {
      const data = this.prisma.recebivel.create({
        data: dto,
      });
      await lastValueFrom(
        this.client.emit('payable_created', {
          data,
        }),
      );
      return data;
    } catch (err) {
      throw err;
    }
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
