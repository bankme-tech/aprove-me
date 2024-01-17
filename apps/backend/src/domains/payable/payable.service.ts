import { Injectable } from '@nestjs/common';
import { CreatePayableWithAssignorDto } from './payable.schema';
import { PrismaService } from '../../services/prisma.service';
import { PaginationSchema } from '../../schemas/pagination.schema';

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

  async store(data: CreatePayableWithAssignorDto) {
    const { assignor } = data;

    if (typeof assignor === 'string') {
      const response = await this.prisma.payable.create({
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

      return response;
    }

    const response = await this.prisma.payable.create({
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

    return response;
  }

  async show(id: string) {
    const response = await this.prisma.payable.findUnique({
      where: { id },
    });

    return response;
  }

  async update(id: string, data: CreatePayableWithAssignorDto) {
    const response = await this.prisma.payable.update({
      data: {
        emissionDate: data.emissionDate,
        value: data.value,
      },

      where: {
        id,
      },
    });

    return response;
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
