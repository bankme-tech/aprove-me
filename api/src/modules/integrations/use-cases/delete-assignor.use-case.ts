import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';

@Injectable()
export class DeleteAssignorUseCase implements IUseCase {
  constructor(
    private assignorsRepository: AssignorsRepository,
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
  ) {}

  public async execute(id: string) {
    await this.findAssignorByIdUseCase.execute(id);
    await this.assignorsRepository.delete(id);
  }
}
