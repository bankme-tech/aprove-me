import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ReceivableDTO } from '../../dtos/receivable.dto';

@Injectable()
export class ReceivableService {
  constructor(private prisma: PrismaService) {}

  async create(assignorID: string, data: ReceivableDTO) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        id: assignorID,
      },
    });

    if (!assignorExists) {
      throw new Error('Assignor not found');
    }

    const receivable = await this.prisma.receivable.create({
      data: {
        value: data.value,
        emission_date: data.emission_date,
        assignor: {
          connect: {
            id: assignorID,
          },
        },
      },
    });

    return receivable;
  }
}
