import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PayableRepository } from 'src/domain/repositories/payable.repository';
import { Payable } from 'src/domain/entities/payable.entity';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Payable[]> {
    try {
      return await this.prisma.payable.findMany();
    } catch (error) {
      const errorMessageLines = error.message.split('\n');
      const formattedErrorMessage =
        errorMessageLines[errorMessageLines.length - 1];
      throw new HttpException(formattedErrorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  async create(payable: CreatePayableDto): Promise<Payable> {
    try {
      const payload = {
        value: payable.value,
        emissionDate: new Date().toISOString(),
        assignor: payable.assignor,
      };
      return await this.prisma.payable.create({ data: payload });
    } catch (error) {
      // Formtando a messagem de erro automatica do Prisma, para ficar amigavel de ler.
      // Pois ele vem todo fora de formatação com um monte de substrings
      const errorMessageLines = error.message.split('\n');
      const formattedErrorMessage =
        errorMessageLines[errorMessageLines.length - 1];
      throw new HttpException(formattedErrorMessage, HttpStatus.BAD_REQUEST);
    }
  }
  async findById(id: string): Promise<Payable> {
    return await this.prisma.payable.findUnique({ where: { id } });
  }
  async update(id: string, payable: Payable): Promise<Payable> {
    return await this.prisma.payable.update({
      where: { id },
      data: payable,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({ where: { id } });
  }
}
