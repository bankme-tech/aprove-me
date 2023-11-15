import { IPayable } from '../../../modules/payable/interfaces/payable.interface';
import { IPayableRepository } from '../../../modules/payable/interfaces/payable.repository.interface';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PayableRepository implements IPayableRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IPayable[]> {
    return this.prisma.payable.findMany();
  }

  async findById(id: string): Promise<IPayable> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  create(payable: IPayable): Promise<IPayable> {
    return this.prisma.payable.create({ data: payable });
  }

  update(payable: Partial<IPayable>): Promise<IPayable> {
    return this.prisma.payable.update({
      where: { id: payable.id },
      data: payable,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({ where: { id } });
  }
}
