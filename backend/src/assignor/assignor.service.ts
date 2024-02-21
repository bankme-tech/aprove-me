import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import AssignorRepository from './repositories/assignorRepository';

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
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }
    return assignor;
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    const assignor = await this.assignorRepository.update(id, updateAssignorDto);
    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    return assignor;
  }

  async remove(id: string) {
    const assignor = await this.assignorRepository.findOne(id);
    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    return this.assignorRepository.delete(id);
  }
}
