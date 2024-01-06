import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './payable.schema';
import { PrismaService } from 'src/services/prisma.service';
import { PaginationSchema } from 'src/schemas/pagination.schema';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  index(pagination: PaginationSchema) {
    return Promise.all([
      this.prisma.payable.findMany({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
      }),
      this.prisma.payable
        .aggregate({
          _count: { id: true },
          take: pagination.limit,
          skip: (pagination.page - 1) * pagination.limit,
        })
        .then((response) => ({
          page: pagination.page,
          pages: Math.ceil(response._count.id / pagination.limit),
          total: response._count.id,
          limit: pagination.limit,
        })),
    ]);
  }

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
