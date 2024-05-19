import { cnpj, cpf } from 'cpf-cnpj-validator';
import { Assignor } from '../entities/assignor.entity';
import { PrismaService } from '@database/prisma.service';
import { AssignorRepository } from './assignor-repository';
import { CreateAssignorDto } from '../dto/create-assignor.dto';
import { UpdateAssignorDto } from '@assignor/dto/update-assignor.dto';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export default class PrismaAssignorRepository extends AssignorRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<Assignor> {
    this.validateDocument(updateAssignorDto.document);

    return this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });
  }

  async getAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
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
