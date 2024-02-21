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

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
