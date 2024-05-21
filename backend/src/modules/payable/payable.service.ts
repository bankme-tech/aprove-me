import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorService } from '../assignor/assignor/assignor.service';
import { CreatePayableDto } from './payable.dto';
@Injectable()
export class PayableService {
  constructor(
    private prisma: PrismaService,
    private readonly assignor: AssignorService,
  ) {}

  async createPayable(data: CreatePayableDto): Promise<Payable> | null {
    const assignor = await this.assignor.findOneAssignor({
      where: { id: data.assignorId },
    });

    if (!assignor) {
      throw new Error('Assignor not found');
    }

    return await this.prisma.payable.create({
      data: data,
    });
  }
}
