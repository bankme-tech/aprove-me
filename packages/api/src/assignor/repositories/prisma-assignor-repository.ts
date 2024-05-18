import { cnpj, cpf } from 'cpf-cnpj-validator';
import { AssignorRepository } from './assignor-repository';
import { PrismaService } from 'src/database/prisma.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { CreateAssignorDto } from '../dto/create-assignor.dto';

export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, phone, document }: CreateAssignorDto) {
    this.validateDocument(document);

    return this.prisma.assignor.create({
      data: { name, email, phone, document },
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
