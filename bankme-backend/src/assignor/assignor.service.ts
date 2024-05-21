import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { AssignorRepository } from './assignor.repository';

@Injectable()
export class AssignorService {
  constructor(private readonly repository: AssignorRepository) {}

  async getAssignorById(id: string) {
    return await this.assignorExists(id);
  }

  async getAllAssignor() {
    return this.repository.findAll()
  }

  async createAssignor(dto: CreateAssignorDto) {
    const createdAssignor = await this.repository.create(dto);
    return createdAssignor;
  }

  async updateAssignor(id: string, dto: UpdateAssignorDto) {
    await this.assignorExists(id);
    const updatedAssignor = await this.repository.update(id, dto);
    return updatedAssignor;
  }

  async deleteAssignor(id: string) {
    await this.assignorExists(id);
    await this.repository.delete(id);
  }

  private async assignorExists(id: string) {
    const assignor = await this.repository.findById(id);
    if (!assignor) {
      throw new NotFoundException(`Assignor with id ${id} not found`);
    }
    return assignor;
  }
}
