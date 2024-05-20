import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './create-payable.dto';
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
}
