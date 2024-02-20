import { Injectable } from '@nestjs/common';
import { Assignor } from 'bme/core/domains/assignors/entities/assignor.entity';
import { IAssignorRepository } from 'bme/core/domains/assignors/interfaces/assignor-repository.interface';
import { PrismaService } from '../prisma-service';

@Injectable()
export class AssignorRepository implements IAssignorRepository {
  constructor(protected prisma: PrismaService) {}

  async create(data: Assignor): Promise<Assignor> {
    return await this.prisma.assignor.create({
      data: {
        ...data,
      },
    });
  }

  async changeById(id: string, data: Assignor): Promise<Assignor> {
    return await this.prisma.assignor.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  async removeById(id: string): Promise<Assignor> {
    return await this.prisma.assignor.delete({
      where: { id: id },
    });
  }

  async getAll<Assignor>(): Promise<Assignor[]> {
    return (await this.prisma.assignor.findMany()) as Assignor[];
  }

  async getById<Assignor>(id: string): Promise<Assignor> {
    return (await this.prisma.assignor.findUnique({
      where: { id: id },
    })) as Assignor;
  }
}
