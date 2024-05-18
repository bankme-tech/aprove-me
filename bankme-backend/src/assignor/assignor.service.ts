import { Injectable } from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { AssignorRepository } from './assignor.repository';

@Injectable()
export class AssignorService {
  constructor(private readonly repository: AssignorRepository) {}

  async getAssignorById(id: string) {
    const assignor = await this.repository.findById(id);
    return assignor;
  }

  async createAssignor(dto: CreateAssignorDto) {
    const createdAssignor = await this.repository.create(dto);
    return createdAssignor;
  }

  async updateAssignor(id: string, dto: UpdateAssignorDto) {
    const updatedAssignor = await this.repository.update(id, dto);
    return updatedAssignor;
  }

  async deleteAssignor(id: string) {
    await this.repository.delete(id);
  }
}
