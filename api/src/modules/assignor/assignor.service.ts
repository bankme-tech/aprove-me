import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AssignorDTO } from './assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async create(data: AssignorDTO) {
    const assignorExists = await this.prisma.assignor.findFirst({
      where: {
        document: data.document,
      },
    });

    if (assignorExists) {
      throw new Error('Assignor already exists');
    }

    const assignor = await this.prisma.assignor.create({
      data,
    });

    return assignor;
  }

  async findAll() {
    try {
      return await this.prisma.assignor.findMany();
    } catch (error) {
      return error;
    }
  }

  async update(id: number, data: AssignorDTO) {
    const assignotExists = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignotExists) {
      throw new Error('Assignor not found');
    }

    return await this.prisma.assignor.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const assignotExists = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });
    if (!assignotExists) {
      throw new Error('Assignor not found');
    }

    return await this.prisma.assignor.delete({
      where: {
        id,
      },
    });
  }
}
