import { Injectable } from '@nestjs/common';
import { Assignor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // Implementação para buscar todos os payables
  }

  async findOne(data: Prisma.AssignorFindUniqueArgs): Promise<Assignor> {
    return await this.prisma.assignor.findUnique(data);
  }
  async create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return await this.prisma.assignor.create({
      data,
    });
  }

  async update() {
    // Implementação para atualizar um payable existente
  }

  async updatePartial() {
    // Implementação para atualizar parcialmente um payable existente
  }

  async remove() {
    // Implementação para remover um payable por ID
  }
}
