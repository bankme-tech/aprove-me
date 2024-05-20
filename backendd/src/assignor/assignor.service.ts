import { Injectable, NotFoundException } from '@nestjs/common';
import AssignorRepository from './repositories/assignorRepository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(createAssignorDto: CreateAssignorDto) {
    return this.assignorRepository.create(createAssignorDto);
  }

  findAll() {
    return this.assignorRepository.findAll();
  }

  async findOne(id: string) {
    const assignor = await this.assignorRepository.findOne(id);
    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }
    return assignor;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.assignorRepository.update(id, updateAssignorDto);
  }

  async remove(id: string) {
    return this.assignorRepository.delete(id);
  }
}
