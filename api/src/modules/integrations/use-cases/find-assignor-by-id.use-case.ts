import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { AssignorNotFoundError } from './errors/assignor-not-found.error';

@Injectable()
export class FindAssignorByIdUseCase implements IUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  public async execute(id: string) {
    const assignor = await this.assignorsRepository.findById(id);

    if (!assignor) {
      throw new AssignorNotFoundError();
    }

    return assignor;
  }
}
