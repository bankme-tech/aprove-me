import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignorDto, UpdateAssignorDto } from './dtos';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  create({ document, email, name, phone }: CreateAssignorDto) {
    return this.prisma.assignor.create({
      data: {
        document,
        email,
        name,
        phone,
      },
    });
  }

  async findById(id: string) {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        document: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    return assignor;
  }

  async delete(id: string) {
    await this.prisma.assignor.delete({
      where: {
        id,
      },
    });
  }

  update(id: string, { document, email, name, phone }: UpdateAssignorDto) {
    return this.prisma.assignor.update({
      where: {
        id,
      },
      data: {
        ...(document ? { document } : {}),
        ...(email ? { email } : {}),
        ...(name ? { name } : {}),
        ...(phone ? { phone } : {}),
      },
    });
  }
}
