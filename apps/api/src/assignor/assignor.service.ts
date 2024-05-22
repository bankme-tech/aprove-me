import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    document,
    email,
    name,
    phone,
    userId,
  }: CreateAssignorDto & { userId: string }) {
    return this.prisma.assignor.create({
      data: {
        document,
        email,
        name,
        phone,
        userId,
      },
      select: {
        id: true,
        document: true,
        email: true,
        name: true,
        phone: true,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.assignor.findMany({
      where: { userId },
    });
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
        userId,
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
      throw new NotFoundException();
    }

    return assignor;
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!assignorExists) {
      throw new NotFoundException();
    }

    return this.prisma.assignor.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async update({
    id,
    userId,
    document,
    email,
    name,
    phone,
  }: UpdateAssignorDto & { id: string; userId: string }) {
    const assignorExists = await this.prisma.assignor.findFirst({
      where: { id, userId },
    });
    if (!assignorExists) {
      throw new NotFoundException();
    }

    return this.prisma.assignor.update({
      where: {
        id,
        userId,
      },
      data: {
        ...(document ? { document } : {}),
        ...(email ? { email } : {}),
        ...(name ? { name } : {}),
        ...(phone ? { phone } : {}),
      },
      select: {
        id: true,
        document: true,
        email: true,
        name: true,
        phone: true,
      },
    });
  }
}
