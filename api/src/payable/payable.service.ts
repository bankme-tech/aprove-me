import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePayableAssignorDto } from 'src/dto-assignor-payable/create-payable-assignor.dto';
import { prisma } from '../prisma/prisma.client';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {

  async create(createPayableAssignorDto: CreatePayableAssignorDto) {
    const { value, emissionDate, document, email, phone, name } = createPayableAssignorDto;

    try {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new BadRequestException('O valor do recebível deve ser um número válido.');
      }

      const assignor = await this.createAssignor(document, email, phone, name);

      const payable = await prisma.payable.create({
        data: {
          value,
          emissionDate,
          assignor: {
            connect: { id: assignor.id },
          },
        },
      });

      const assignorData = await prisma.assignor.findUnique({
        where: { id: assignor.id },
      });

  
      return { payable, assignor: assignorData };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Ocorreu um erro ao criar o recebível.');
    }
  }

  async createAssignor(document: string, email: string, phone: string, name: string) {
    const assignor = await prisma.assignor.create({
      data: {
        document,
        email,
        phone,
        name,
      },
    });

    return assignor;
  }


  async findOne(id: string) {
    const payable = await prisma.payable.findUnique({
      where: { id },
    });
    if (!payable) {
      throw new NotFoundException('Recebível não encontrado.');
    }
    return payable;
  }

  async deletePayable(id: string) {
    const payable = await prisma.payable.delete({
      where: { id },
    });
    if (!payable) {
      throw new NotFoundException('Recebível não encontrado.');
    }

    return { message: 'Recebível apagado com sucesso.' };
  }

  async updatePayable(id: string, updatePayableDto: UpdatePayableDto) {
    try {
      const payable = await prisma.payable.update({
        where: { id },
        data: updatePayableDto,
      });
      return payable;
    } catch (error) {
      throw new NotFoundException('Recebível não encontrado.');
    }
  }
    
}
