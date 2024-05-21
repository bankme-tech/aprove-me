import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import AssignorRepository from './repositories/assignor.repository';
import { Assignor } from './entities/assignor.entity';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    return await this.assignorRepository.create(createAssignorDto);
  }

  async findAll(): Promise<Assignor[]> {
    return await this.assignorRepository.findAll();
  }

  async findOne(id: string): Promise<Assignor> {
    const assignor = await this.assignorRepository.findOne(id);
    if (!assignor) {
      throw new NotFoundException(`Assignor with id ${id} not found`);
    }
    return assignor;
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    return await this.assignorRepository.update(id, updateAssignorDto);
  }

  async remove(id: string) {
    return await this.assignorRepository.delete(id);
  }
}
