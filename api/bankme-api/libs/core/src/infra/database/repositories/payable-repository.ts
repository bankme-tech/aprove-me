import { IPayableRepository } from 'bme/core/domains/payables/interfaces/payable-repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service';
import { Payable } from 'bme/core/domains/payables/entities/payable.entity';

@Injectable()
export class PayableRepository implements IPayableRepository {
  constructor(protected prisma: PrismaService) {}

  async getAll<Payable>(): Promise<Payable[]> {
    return (await this.prisma.payable.findMany()) as Payable[];
  }

  async getById<Payable>(id: string): Promise<Payable> {
    return (await this.prisma.payable.findUnique({
      where: { id: id },
    })) as Payable;
  }

  async create(data: Payable): Promise<Payable> {
    return await this.prisma.payable.create({
      data: {
        ...data,
      },
    });
  }

  async changeById(id: string, data: Payable): Promise<Payable> {
    return await this.prisma.payable.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  async removeById(id: string): Promise<Payable> {
    return await this.prisma.payable.delete({
      where: { id: id },
    });
  }
}
