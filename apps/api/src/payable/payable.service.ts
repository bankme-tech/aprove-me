import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './create-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}
  create({ assignorId, emissionDate, value }: CreatePayableDto) {
    return this.prisma.payable.create({
      data: {
        value,
        assignorId,
        emissionDate: new Date(emissionDate),
      },
    });
  }
}
