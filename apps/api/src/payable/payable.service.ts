import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}
  create({
    assignorId,
    userId,
    emissionDate,
    value,
  }: CreatePayableDto & { userId: string }) {
    return this.prisma.payable.create({
      data: {
        value,
        userId,
        assignorId,
        emissionDate: new Date(emissionDate),
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.payable.findMany({
      where: {
        userId,
      },
    });
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        value: true,
        emissionDate: true,
        assignorId: true,
        userId: true,
      },
    });

    if (!payable) {
      throw new NotFoundException();
    }

    return payable;
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const payableExists = await this.prisma.payable.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!payableExists) {
      throw new NotFoundException();
    }

    return this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }

  async update({
    id,
    userId,
    emissionDate,
    value,
  }: UpdatePayableDto & { id: string; userId: string }) {
    const payableExists = await this.prisma.payable.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!payableExists) {
      throw new NotFoundException();
    }

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
