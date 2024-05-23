import { PrismaService } from 'src/persistence/prisma.service';
import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from './assignor.repository.interface';
import { Injectable } from '@nestjs/common';
import { AssignorMapper } from '../mappers/assignor.mapper.interface';
import { Assignor } from '@prisma/client';

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

  async findById(id: string): Promise<AssignorEntity> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignor) {
      return null;
    }

    return this.mapper.toDomainEntity(assignor);
  }
}
