import { Injectable } from '@nestjs/common';
import { Assignor } from 'bme/core/domains/assignors/entities/assignor.entity';
import { IAssignorRepository } from 'bme/core/domains/assignors/interfaces/assignor-repository.interface';
import { PrismaService } from '../prisma-service';

@Injectable()
export class AssignorRepository implements IAssignorRepository {
  constructor(protected prisma: PrismaService) {}

  async documentExists(document: string): Promise<boolean> {
    const result = await this.prisma.assignor.count({
      where: {
        document,
      },
    });
    return result > 0;
  }

  async emailExists(email: string): Promise<boolean> {
    const result = await this.prisma.assignor.count({
      where: {
        email,
      },
    });
    return result > 0;
  }

  async create(data: Assignor): Promise<Assignor> {
    return await this.prisma.assignor.create({
      data: {
        ...data,
      },
    });
  }

  async changeById(id: string, data: Assignor): Promise<Assignor> {
    return await this.prisma.assignor.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async removeById(id: string): Promise<Assignor> {
    return await this.prisma.assignor.delete({
      where: { id },
    });
  }

  async getAll<Assignor>(): Promise<Assignor[]> {
    return (await this.prisma.assignor.findMany()) as Assignor[];
  }

  async getById<Assignor>(id: string): Promise<Assignor> {
    return (await this.prisma.assignor.findUnique({
      where: { id },
    })) as Assignor;
  }
}
