import { IUseCase } from '@/core/use-cases/interfaces';

import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { CreateAssignorDto } from '../infra/http/dtos/create-assignor.dto';
import { Assignor } from '../domain/entities/assignor.entity';

@Injectable()
export class CreateAssignorUseCase implements IUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  public async execute(createAssignorDto: CreateAssignorDto) {
    const assignor = new Assignor({
      document: createAssignorDto.document,
      email: createAssignorDto.email,
      phone: createAssignorDto.phone,
      name: createAssignorDto.name,
    });

    const createdPayable = await this.assignorsRepository.save(assignor);

    return createdPayable;
  }
}
