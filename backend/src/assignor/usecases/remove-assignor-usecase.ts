import { Injectable } from '@nestjs/common';
import { RemoveAssignorInputDTO } from '../dto/remove-assignor.input.dto';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IRemoveAssignorUseCase } from './remove-assignor.usecase.interface';

@Injectable()
export class RemoveAssignorUseCase implements IRemoveAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  execute(removeAssignorDTO: RemoveAssignorInputDTO): Promise<void> {
    return this.assignorRepository.remove(removeAssignorDTO.id);
  }
}
