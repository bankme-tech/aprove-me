import { Injectable } from '@nestjs/common';
import { CreatePayableWithAssignorDto } from './payable.schema';
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

  store(data: CreatePayableWithAssignorDto) {
    const { assignor } = data;

    if (typeof assignor === 'string') {
      return this.prisma.payable.create({
        data: {
          emissionDate: data.emissionDate,
          value: data.value,
          assignor: {
            connect: {
              id: assignor,
            },
          },
        },
      });
    }

    return this.prisma.payable.create({
      data: {
        emissionDate: data.emissionDate,
        value: data.value,
        assignor: {
          create: {
            document: assignor.document,
            email: assignor.email,
            name: assignor.name,
            phone: assignor.phone,
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

  update(id: string, data: CreatePayableWithAssignorDto) {
    return this.prisma.payable.update({
      data: {
        emissionDate: data.emissionDate,
        value: data.value,
      },

      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    try {
      const data = await this.prisma.payable.delete({
        where: { id },
      });

      return data;
    } catch (e) {
      return undefined;
    }
  }
}
