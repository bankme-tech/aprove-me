import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}
  create({ assignorId, emissionDate, value }: CreatePayableDto) {
    return this.prisma.payable.create({
      data: {
        value,
        assignorId,
        emissionDate: new Date(emissionDate),
      },
    });
  }

  async findById(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        value: true,
        emissionDate: true,
        assignorId: true,
      },
    });

    if (!payable) {
      throw new NotFoundException('Payable not found');
    }

    return payable;
  }

  async delete(id: string) {
    await this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }

  update(id: string, { emissionDate, value }: UpdatePayableDto) {
    return this.prisma.payable.update({
      where: {
        id,
      },
      data: {
        ...(emissionDate ? { emissionDate: new Date(emissionDate) } : {}),
        ...(value ? { value } : {}),
      },
    });
  }
}
