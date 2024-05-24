import { PrismaService } from 'src/persistence/prisma.service';
import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from './assignor.repository.interface';
import { Injectable } from '@nestjs/common';
import { AssignorMapper } from '../mappers/assignor.mapper.interface';
import { Assignor } from '@prisma/client';
import { UpdateAssignorInputDTO } from '../dto/update-assignor.input.dto';
import { PrismaErrorCodes } from 'src/exception-filters/prisma-exception.filter';
import { ReferencedRecordError } from 'src/persistence/errors/referenced-record-error';

@Injectable()
export class PrismaAssignorRepository implements IAssignorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AssignorMapper<Assignor>,
  ) {}

  async save(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    const assignor = this.mapper.toPersistenceModel(createAssignorDTO);
    const response = await this.prisma.assignor.create({
      data: {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    });

    return this.mapper.toDomainEntity(response);
  }

  async findAll(): Promise<AssignorEntity[]> {
    const assignors = await this.prisma.assignor.findMany();

    return assignors.map((assignor) => this.mapper.toDomainEntity(assignor));
  }

  async findById(id: string): Promise<AssignorEntity> {
    const assignor = await this.prisma.assignor.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return this.mapper.toDomainEntity(assignor);
  }

  async update(assignor: UpdateAssignorInputDTO): Promise<AssignorEntity> {
    await this.prisma.assignor.update({
      where: {
        id: assignor.id,
      },
      data: {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    });

    return this.findById(assignor.id);
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.assignor.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === PrismaErrorCodes.ForeignKeyConstraintViolation) {
        throw new ReferencedRecordError('Assignor');
      }
      throw error;
    }
  }
}
