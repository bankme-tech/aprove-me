import { Injectable } from '@nestjs/common';
import { FindAssignorInputDTO } from '../dto/find-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IFindAssignorUseCase } from './find-assignor.usecase.interface';

@Injectable()
export class FindAssignorUseCase implements IFindAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(
    findAssignorDTO: FindAssignorInputDTO,
  ): Promise<AssignorEntity> {
    return await this.assignorRepository.findById(findAssignorDTO.id);
  }
}
