import { Inject, Injectable } from '@nestjs/common';
import { AssignorRepository } from '../repositories/assignor.repository';
import { CreateAssignorDto } from 'src/application/dtos/create-assignor.dto';
import { Assignor } from '../entities/assignor.entity';

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
  async update(id: string, assignor: Assignor) {
    return this.assignorRepository.update(id, assignor);
  }

  async delete(id: string) {
    return this.assignorRepository.delete(id);
  }
}
