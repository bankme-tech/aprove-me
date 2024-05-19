import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PayableRepository } from 'src/domain/repositories/payable.repository';
import { Payable } from 'src/domain/entities/payable.entity';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

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
  findById(id: string): Promise<Payable> {
    throw new Error('Method not implemented.');
  }
  update(id: string, payable: Payable): Promise<Payable> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
