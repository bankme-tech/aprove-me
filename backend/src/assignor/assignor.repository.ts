import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Assignor } from '@prisma/client';

@Injectable()
export class AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAssignorDto): Promise<Assignor> {
    return this.prisma.assignor.create({ data });
  }

  findAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }

  async findOne(id: number): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAssignorDto): Promise<Assignor> {
    return this.prisma.assignor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Assignor> {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
