import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class CrudStrategyService<T, C, U> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly model: Prisma.ModelName,
  ) {}

  async create(data: C): Promise<T> {
    return await this.prisma[this.model].create({ data });
  }

  async findAll(): Promise<T[]> {
    return await this.prisma[this.model].findMany();
  }

  async findOne(id: string): Promise<T> {
    const data = await this.prisma[this.model].findUnique({
      where: { id },
    });

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
