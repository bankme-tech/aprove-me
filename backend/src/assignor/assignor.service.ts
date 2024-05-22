import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
  create(createAssignorDto: CreateAssignorDto) {
    return {
      id: randomUUID(),
      ...createAssignorDto,
    };
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
