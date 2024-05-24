import { Injectable } from '@nestjs/common';
import { UpdateAssignorInputDTO } from '../dto/update-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IUpdateAssignorUseCase } from './update-assignor.usecase.interface';

@Injectable()
export class UpdateAssignorUseCase implements IUpdateAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(
    updateAssignorDTO: UpdateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    return await this.assignorRepository.update(updateAssignorDTO);
  }
}
