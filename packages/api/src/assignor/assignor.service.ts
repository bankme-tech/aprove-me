import { Injectable } from '@nestjs/common';
import { AssignorRepository } from './repositories/assignor-repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private assignorRepository: AssignorRepository) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.assignorRepository.create(createAssignorDto);
  }

  async findById(id: string) {
    return this.assignorRepository.findById(id);
  }

  async getAll() {
    return this.assignorRepository.getAll();
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.assignorRepository.update(id, updateAssignorDto);
  }
}
