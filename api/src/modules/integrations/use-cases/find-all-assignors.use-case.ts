import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';

@Injectable()
export class FindAllAssignorsUseCase implements IUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  public async execute() {
    return await this.assignorsRepository.findAll();
  }
}
