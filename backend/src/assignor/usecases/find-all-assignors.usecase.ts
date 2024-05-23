import { Injectable } from '@nestjs/common';
import { AssignorEntity } from '../entities/assignor.entity';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { IFindAllAssignorsUseCase } from './find-all-assignors.usecase.interface';

@Injectable()
export class FindAllAssignorsUseCase implements IFindAllAssignorsUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(): Promise<AssignorEntity[]> {
    return await this.assignorRepository.findAll();
  }
}
