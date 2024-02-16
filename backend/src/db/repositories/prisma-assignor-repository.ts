import { Injectable } from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from 'src/domain/dtos';
import { Assignor } from 'src/domain/entities';
import { AssignorRepository } from 'src/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    const assignor = await this.prisma.assignor.create({
      data: {
        ...createAssignorDto,
      },
    });

    return assignor;
  }

  async findById(id: string) {
    const assignor = await this.prisma.assignor.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!assignor) {
      return null;
    }

    return assignor;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.assignor.update({
      where: {
        id,
      },
      data: {
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    });
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<void> {
    await this.prisma.assignor.update({
      where: {
        id,
      },
      data: {
        updated_at: new Date(),
        ...updateAssignorDto,
      },
    });
  }
}
