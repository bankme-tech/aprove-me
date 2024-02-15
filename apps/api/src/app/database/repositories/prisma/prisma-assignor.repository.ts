import { Injectable } from '@nestjs/common';
import { AssignorRepository } from '../assignor.repository';
import { PrismaService } from '@/database/prisma.service';
import { Assignor } from '@prisma/client';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    return assignor;
  }

  async findByDocument(document: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        document,
      },
    });

    return assignor;
  }

  async create(data: Assignor): Promise<Assignor> {
    const assignor = await this.prisma.assignor.create({
      data,
    });

    return assignor;
  }
}
