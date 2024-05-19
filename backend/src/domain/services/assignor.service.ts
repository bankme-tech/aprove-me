import { Inject, Injectable } from '@nestjs/common';
import { AssignorRepository } from '../repositories/assignor.repository';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';

@Injectable()
export class AssignorService {
  
  constructor(
    @Inject('AssignorRepository')
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async createAssignor(assignor: CreateAssignorDto) {
    return this.assignorRepository.create(assignor);
  }

  async findById(id: string) {
    return this.assignorRepository.findById(id);
  }
}
