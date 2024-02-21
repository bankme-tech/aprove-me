import { Injectable } from '@nestjs/common';
import { CreateAssignorDataDTO } from './dtos/CreateAssignorDTO';
import { FindOneAssignorDataDTO } from './dtos/FindOneAssignorDTO';
import { AssignorsRepository } from './assignors.repository';
import { UpdateAssignorDataDTO } from './dtos/UpdateAssignorDTO';
import { FindAllAssignorDataDTO } from './dtos/FindAllAssignorDTO';
import { DeleteAssignorDataDTO } from './dtos/DeleteAssignorDTO';

@Injectable()
export class AssignorsService {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async create(data: CreateAssignorDataDTO) {
    const { name, email, phone, document, userId } = data;
    return this.assignorsRepository.create({
      name,
      email,
      phone,
      document,
      userId,
    });
  }
  async findOne(data: FindOneAssignorDataDTO) {
    const { id } = data;
    return this.assignorsRepository.findOne(id);
  }

  async findAll(data: FindAllAssignorDataDTO) {
    const { email, name, phone, document, limit, offset } = data;

    return this.assignorsRepository.findAll({
      email,
      name,
      phone,
      document,
      limit,
      offset,
    });
  }

  async update(data: UpdateAssignorDataDTO) {
    const { email, id, name, phone, document } = data;
    return this.assignorsRepository.update({
      name,
      email,
      phone,
      document,
      id,
    });
  }

  async delete(data: DeleteAssignorDataDTO) {
    const { id } = data;
    this.assignorsRepository.delete(id);
  }
}
