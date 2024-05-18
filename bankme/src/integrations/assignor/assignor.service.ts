import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Assignor from '../entity/Assignor';
import AssignorRepository from './assignor.repository';
import { IAssignor } from '../types/IAssignor';

@Injectable()
export class AssignorService {
  constructor(private assignorRepository: AssignorRepository) {}

  async createAssignorRegister(assignor: Assignor): Promise<IAssignor> {
    const createdAssignor =
      await this.assignorRepository.createAssignorRegister(assignor);

    return createdAssignor;
  }

  async findAssignorById(id: string) {
    const assignor = await this.assignorRepository.findAssignorById(id);

    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    return assignor;
  }
}
