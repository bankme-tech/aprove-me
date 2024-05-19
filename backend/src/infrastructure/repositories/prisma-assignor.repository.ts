import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AssignorRepository } from 'src/domain/repositories/assignor.repository';
import { Assignor } from 'src/domain/entities/assignor.entity';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';
import { UpdateAssignorDto } from 'src/application/dtos/update-assignor.dto';

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
  async findById(id: string): Promise<Assignor> {
    return await this.prisma.assignor.findUnique({ where: { id } });
  }
  async update(id: string, assignor: UpdateAssignorDto): Promise<Assignor> {
    return await this.prisma.assignor.update({
      where: { id },
      data: assignor,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
