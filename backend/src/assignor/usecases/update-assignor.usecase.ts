import { Injectable } from '@nestjs/common';
import { UpdateAssignorInputDTO } from '../dto/update-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IUpdateAssignorUseCase } from './update-assignor.usecase.interface';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

@Injectable()
export class UpdateAssignorUseCase implements IUpdateAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(
    updateAssignorDTO: UpdateAssignorInputDTO,
  ): Promise<AssignorEntity> {
    const assignor = await this.assignorRepository.findById(
      updateAssignorDTO.id,
    );
    if (!assignor) {
      throw new RecordNotFoundError('Assignor');
    }
    return await this.assignorRepository.update(updateAssignorDTO);
  }
}
