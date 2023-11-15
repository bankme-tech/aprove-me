import { Inject, Injectable } from '@nestjs/common';
import { IAssignorService } from './interfaces/assignor-service.interface';
import { CreateAssignorDTO } from './dto/create-assignor.dto';
import { IAssignor } from './interfaces/assignor.interface';
import { AssignorRepository } from 'src/infra/database/prisma/assignor.repository';
import { IAssignorRepository } from './interfaces/assignor.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AssignorService implements IAssignorService {
  constructor(
    @Inject(AssignorRepository)
    private readonly assignorRepository: IAssignorRepository,
  ) {}

  async create(assignor: CreateAssignorDTO): Promise<IAssignor> {
    return this.assignorRepository.create({ ...assignor, id: randomUUID() });
  }
}
