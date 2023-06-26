import { Injectable } from '@nestjs/common';
import { PrismaClient, Assignor } from '@prisma/client';
import { AssignorEntity } from '../assignor.entity';

@Injectable()
export class AssignorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAssignor(assignor: AssignorEntity): Promise<Assignor> {
    return this.prisma.assignor.create({ data: assignor });
  }

  async getAssignorById(id: number): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  async updateAssignor(
    id: number,
    assignor: AssignorEntity,
  ): Promise<Assignor> {
    return this.prisma.assignor.update({ where: { id }, data: assignor });
  }

  async deleteAssignor(id: number): Promise<Assignor> {
    return this.prisma.assignor.delete({ where: { id } });
  }

  async getAllAssignors(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }
}
