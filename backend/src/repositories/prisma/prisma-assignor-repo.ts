import { PrismaService } from '../../database/prisma.service';
import { AssignorRepo } from '../assignor-repo';
import { AssignorDto } from 'src/DTOs/assignor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class prismaAssignorRepo implements AssignorRepo {
  constructor(private prisma: PrismaService) {}

  async createAssignor(body: AssignorDto): Promise<AssignorDto> {
    const { id, name, email, phone, document } = body;
    const newAssignor = await this.prisma.cedente.create({
      data: {
        id,
        name,
        email,
        phone,
        document,
      },
    });
    return newAssignor;
  }

  async getAssignorById(id: string): Promise<AssignorDto> {
    const assignor = await this.prisma.cedente.findUnique({
      where: {
        id,
      },
    });
    return assignor;
  }

  async getAllAssignors(): Promise<AssignorDto[]> {
    const assignors = await this.prisma.cedente.findMany();
    return assignors;
  }

  async updateAssignor(id: string, body: AssignorDto): Promise<AssignorDto> {
    const { name, email, phone, document } = body;
    const assignor = await this.prisma.cedente.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        document,
      },
    });
    return assignor;
  }

  async deleteAssignor(id: string): Promise<void> {
    await this.prisma.cedente.delete({
      where: {
        id,
      },
    });
  }
}
