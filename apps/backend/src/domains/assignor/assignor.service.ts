import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { PaginationSchema } from '../../schemas/pagination.schema';
import { CreateAssignorSchema } from '../../schemas/assignor.schema';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  index(pagination: PaginationSchema) {
    return Promise.all([
      this.prisma.assignor.findMany({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
        where: {
          name: {
            contains: pagination.q,
          },
        },
      }),
      this.prisma.assignor
        .aggregate({
          _count: { id: true },
          take: pagination.limit,
          skip: (pagination.page - 1) * pagination.limit,
          where: {
            name: {
              contains: pagination.q,
            },
          },
        })
        .then((response) => ({
          page: pagination.page,
          pages: Math.ceil(response._count.id / pagination.limit),
          total: response._count.id,
          limit: pagination.limit,
        })),
    ]);
  }

  async store(data: CreateAssignorSchema) {
    const response = await this.prisma.assignor.create({
      data: {
        document: data.document,
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });

    return response;
  }

  async show(id: string) {
    const response = await this.prisma.assignor.findUnique({
      where: { id },
    });

    return response;
  }

  async update(id: string, data: CreateAssignorSchema) {
    const response = await this.prisma.assignor.update({
      data,

      where: {
        id,
      },
    });

    return response;
  }

  async delete(id: string) {
    try {
      const data = await this.prisma.assignor.delete({
        where: { id },
      });

      return data;
    } catch (e) {
      return undefined;
    }
  }
}
