import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './payable.schema';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  store(data: CreatePayableDto) {
    return this.prisma.payable.create({
      data: {
        emissionDate: data.emissionDate,
        value: data.value,
        assignor: {
          create: {
            document: data.assignor.document,
            email: data.assignor.email,
            name: data.assignor.name,
            phone: data.assignor.phone,
          },
        },
      },

      include: {
        assignor: true,
      },
    });
  }

  show(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }
}
