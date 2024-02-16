import { Injectable } from '@nestjs/common';
import { CreateReceivableDto, UpdateReceivableDto } from 'src/domain/dtos';
import { Receivable } from 'src/domain/entities';
import { ReceivableRepository } from 'src/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaReceivableRepository implements ReceivableRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateReceivableDto): Promise<Receivable> {
    const receivable = await this.prisma.receivable.create({
      data: {
        ...input,
      },
    });

    return receivable;
  }

  async findById(id: string): Promise<Receivable> {
    const receivable = await this.prisma.receivable.findFirst({
      where: {
        id,
      },
    });

    if (!receivable) {
      return null;
    }

    return receivable;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.receivable.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async deleteMany(assignor_id: string): Promise<void> {
    await this.prisma.receivable.updateMany({
      where: {
        assignor_id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async update(
    id: string,
    updateReceivableDto: UpdateReceivableDto,
  ): Promise<void> {
    await this.prisma.receivable.update({
      where: {
        id,
      },
      data: {
        updated_at: new Date(),
        ...updateReceivableDto,
      },
    });
  }
}
