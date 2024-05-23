/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type PrismaQuery = {
  where: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput;
};

@Injectable()
export class CrudStrategyService<T, C, U> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly model: Prisma.ModelName,
  ) {}

  async create(data: C, req?): Promise<T> {
    return await this.prisma[this.model].create({ data });
  }

  async findMany({ skip = 0, take = 10 }): Promise<T[]> {
    return await this.prisma[this.model].findMany({ skip, take });
  }

  async findOne(query: PrismaQuery | string): Promise<T> {
    // TODO: Should extensible for new queries and closed to changes
    const findById = typeof query === 'string';
    console.log('🚀 ~ CrudStrategyService<T, ~ findOne ~ findById:', findById);
    const data = await this.prisma[this.model].findUnique(
      findById
        ? {
            where: { id: query },
          }
        : query,
    );

    if (!data) {
      throw new NotFoundException(`${this.model} not found`);
    }

    return data;
  }

  async update(id: string, data: U): Promise<T> {
    return await this.prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<T> {
    return await this.prisma[this.model].delete({
      where: { id },
    });
  }
}
