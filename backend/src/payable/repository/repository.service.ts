import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Payable, Prisma } from '@prisma/client';
import { CreatePayableAssignorDto } from '../payable.dto';
// import { PayableType } from 'src/rabbit-mq/consumer.service';

type PayableType =  {
  "assignorId": string,
  "amount": number,
  "description": string,
  "dueDate": Date
}

@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: PayableType): Promise<any> {
    
    const result = await this.prisma.payable.create({
      data: {
        description: data.description,
        amount: data.amount,
        dueDate: data.dueDate,
        assignorId: data.assignorId, 
      }
    })

    return result
  }

  async create(data: CreatePayableAssignorDto): Promise<any> {
    
    const createdAssignor = await this.prisma.assignor.create({
      data: {
        name: data.assignor.name,
      },
    });

    await this.prisma.payable.createMany({
      data: data.payables.map((el) => ({
        description: el.description,
        amount: el.amount,
        dueDate: new Date(), // Ajuste conforme necessário
        assignorId: createdAssignor.id, // Usa o ID gerado para o Assignor
      })),
    });

    const createdPayables = await this.prisma.payable.findMany({
      where: {
        assignorId: createdAssignor.id,
      },
    });
  
    return {
      assignor: createdAssignor,
      payables: createdPayables,
    };
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }

  async findOne(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.PayableUpdateInput): Promise<Payable> {
    return this.prisma.payable.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Payable> {
    return this.prisma.payable.delete({ where: { id } });
  }
}
