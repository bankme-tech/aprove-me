import { Inject, Injectable } from '@nestjs/common';
import { AssignorRepository } from '../repositories/assignor.repository';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(
    @Inject('AssignorRepository')
    private readonly AssignorRepository: AssignorRepository,
  ) {}

  async createAssignor(assignor: CreateAssignorDto) {
    return this.AssignorRepository.create(assignor);
  }
}
