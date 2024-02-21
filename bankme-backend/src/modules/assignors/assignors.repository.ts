import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { AssignorEntity } from './entities/assignors.entity';
import { CreateAssignorDataDTO } from './dtos/CreateAssignorDTO';
import { FindAllAssignorDataDTO } from './dtos/FindAllAssignorDTO';
import { UpdateAssignorDataDTO } from './dtos/UpdateAssignorDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    email,
    phone,
    document,
    userId,
  }: CreateAssignorDataDTO): Promise<AssignorEntity> {
    return this.prisma.assignor.create({
      data: {
        name,
        email,
        phone,
        document,
        userId,
      },
    });
  }
  async findByEmail(email: string): Promise<AssignorEntity | null> {
    return this.prisma.assignor.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(
    data: FindAllAssignorDataDTO,
  ): Promise<{ assignors: AssignorEntity[]; totalPages: number }> {
    const { email, name, phone, document, limit, offset } = data;

    const query: Prisma.AssignorFindManyArgs = {
      where: {
        email: {
          contains: email,
        },
        name: {
          contains: name,
        },
        phone: {
          contains: phone,
        },
        document: {
          contains: document,
        },
      },
      take: limit,
      skip: limit * offset,
    };

    const [assignors, count] = await this.prisma.$transaction([
      this.prisma.assignor.findMany(query),
      this.prisma.assignor.count({ where: query.where }),
    ]);

    return {
      assignors,
      totalPages: Math.ceil(Number(count) / limit),
    };
  }
  async findOne(id: number): Promise<AssignorEntity | null> {
    return this.prisma.assignor.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const assignorExist = await this.prisma?.assignor?.findFirst({
      where: {
        id,
      },
    });

    if (!assignorExist) return;

    await this.prisma?.assignor?.delete({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateAssignorDataDTO): Promise<AssignorEntity> {
    const { id, name, email, document, phone } = data;

    return this.prisma.assignor.update({
      data: {
        name,
        email,
        document,
        phone,
      },
      where: {
        id,
      },
    });
  }
}
