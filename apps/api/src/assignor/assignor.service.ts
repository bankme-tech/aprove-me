import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

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
}
