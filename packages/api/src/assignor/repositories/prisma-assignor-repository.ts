import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Assignor } from '../entities/assignor.entity';
import { AssignorRepository } from './assignor-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@Injectable()
export default class PrismaAssignorRepository extends AssignorRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    this.validateDocument(createAssignorDto.document);

    return this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }

  async findById(id: string): Promise<Assignor> {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  private validateDocument(document: string) {
    const isCpfValid = cpf.isValid(document);
    const isCnpjValid = cnpj.isValid(document);

    if (!isCnpjValid && !isCpfValid) {
      throw new UnprocessableEntityException('document is not valid');
    }
  }
}
