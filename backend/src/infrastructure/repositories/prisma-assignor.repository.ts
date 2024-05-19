import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AssignorRepository } from 'src/domain/repositories/assignor.repository';
import { Assignor } from 'src/domain/entities/assignor.entity';
import { CreateAssignorDto } from 'src/application/dtos/create-Assignor.dto';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(assignor: CreateAssignorDto) {
    try {
      return await this.prisma.assignor.create({ data: assignor });
    } catch (error) {
      // Formtando a messagem de erro automatica do Prisma, para ficar amigavel de ler.
      // Pois ele vem todo fora de formatação com um monte de substrings
      const errorMessageLines = error.message.split('\n');
      const formattedErrorMessage =
        errorMessageLines[errorMessageLines.length - 1];
      throw new HttpException(formattedErrorMessage, HttpStatus.BAD_REQUEST);
    }
  }
  findById(id: string): Promise<Assignor> {
    throw new Error('Method not implemented.');
  }
  update(id: string, assignor: Assignor): Promise<Assignor> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
