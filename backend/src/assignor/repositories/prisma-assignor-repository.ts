import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';

import { UpdateAssignorDto } from '../dto/update-assignor.dto';
import AssignorRepository from './assignor.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class PrismaAssignorRepository extends AssignorRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    const { document, name, email, phone } = createAssignorDto;
    return this.prisma.assignor.create({
      data: {
        document,
        name,
        email,
        phone,
      },
    });
  }

  async findOne(id: string): Promise<Assignor> {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    const { document, name, email, phone } = updateAssignorDto;
    return this.prisma.assignor.update({
      where: { id },
      data: {
        document,
        name,
        email,
        phone,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
