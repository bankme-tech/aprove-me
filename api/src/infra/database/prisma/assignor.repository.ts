import { IAssignorRepository } from '../../../modules/assignor/interfaces/assignor.repository.interface';
import { PrismaService } from './prisma.service';
import { IAssignor } from '../../../modules/assignor/interfaces/assignor.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignorRepository implements IAssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create(assignor: IAssignor): Promise<IAssignor> {
    return this.prisma.assignor.create({ data: assignor });
  }

  async findAll(): Promise<IAssignor[]> {
    return this.prisma.assignor.findMany();
  }

  async findById(id: string): Promise<IAssignor> {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  async update(assignor: Partial<IAssignor>): Promise<IAssignor> {
    return this.prisma.assignor.update({
      where: { id: assignor.id },
      data: assignor,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
