import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { PaginationSchema } from 'src/schemas/pagination.schema';
import { CreateAssignorSchema } from 'src/schemas/assignor.schema';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  index(pagination: PaginationSchema) {
    return Promise.all([
      this.prisma.assignor.findMany({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
      }),
      this.prisma.assignor
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

  store(data: CreateAssignorSchema) {
    return this.prisma.assignor.create({
      data: {
        document: data.document,
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });
  }

  show(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  update(id: string, data: CreateAssignorSchema) {
    return this.prisma.assignor.update({
      data,

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
