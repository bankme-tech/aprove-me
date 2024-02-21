import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import AssignorRepository from './repositories/assignorRepository';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  create(createAssignorDto: CreateAssignorDto) {
    return this.assignorRepository.create(createAssignorDto);
  }

  findAll() {
    return `This action returns all assignor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignor`;
  }

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
