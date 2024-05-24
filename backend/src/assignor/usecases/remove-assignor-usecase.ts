import { Injectable } from '@nestjs/common';
import { RemoveAssignorInputDTO } from '../dto/remove-assignor.input.dto';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IRemoveAssignorUseCase } from './remove-assignor.usecase.interface';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

@Injectable()
export class RemoveAssignorUseCase implements IRemoveAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(removeAssignorDTO: RemoveAssignorInputDTO): Promise<void> {
    const assignor = await this.assignorRepository.findById(
      removeAssignorDTO.id,
    );
    if (!assignor) {
      throw new RecordNotFoundError('Assignor');
    }
    return this.assignorRepository.remove(removeAssignorDTO.id);
  }
}
