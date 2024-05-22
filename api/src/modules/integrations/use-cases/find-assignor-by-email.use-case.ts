import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { AssignorNotFoundError } from './errors/assignor-not-found.error';

@Injectable()
export class FindAssignorByEmailCase implements IUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  public async execute(email: string) {
    const assignor = await this.assignorsRepository.findByEmail(email);

    if (!assignor) {
      throw new AssignorNotFoundError();
    }

    return assignor;
  }
}
