import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorService } from '../assignor/assignor.service';
import { CreatePayableDto } from './payable.dto';
@Injectable()
export class PayableService {
  constructor(
    private prisma: PrismaService,
    private readonly assignor: AssignorService,
  ) {}

  async findAll() {
    // Implementação para buscar todos os payables
  }

  async findOne(id: Pick<CreatePayableDto, 'id'>['id']): Promise<Payable> {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new Error('Payable not found');
    }

    return payable;
  }

  async create(data: Omit<CreatePayableDto, 'id'>): Promise<Payable> {
    await this.assignor.findOne(data.assignorId);

    return await this.prisma.payable.create({
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
