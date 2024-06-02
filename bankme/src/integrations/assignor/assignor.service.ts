import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Assignor from '../entity/Assignor';
import AssignorRepository from './assignor.repository';
import AssignorDto from '../dto/AssignorDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AssignorService {
  constructor(private assignorRepository: AssignorRepository) {}

  async createAssignorRegister(assignor: Assignor): Promise<AssignorDto> {
    assignor.password = await bcrypt.hash(assignor.password, 10);

    const createdAssignor =
      await this.assignorRepository.createAssignorRegister(assignor);

    return AssignorDto.fromEntity(createdAssignor);
  }

  async findAssignorById(id: string): Promise<AssignorDto> {
    const assignor = await this.assignorRepository.findAssignorById(id);

    if (!assignor) {
      throw new HttpException('Assignor not found.', HttpStatus.NOT_FOUND);
    }

    return AssignorDto.fromEntity(assignor);
  }

  async updateAssignorById(
    id: string,
    assignor: Assignor,
  ): Promise<AssignorDto> {
    const updatedAssignor = await this.assignorRepository.updateAssignorById(
      id,
      assignor.toCreate(),
    );

    if (!updatedAssignor) {
      throw new HttpException('Assignor not found.', HttpStatus.NOT_FOUND);
    }

    return AssignorDto.fromEntity(updatedAssignor);
  }

  async deleteAssignorById(id: string): Promise<void> {
    const assignor = await this.assignorRepository.updateAssignorById(id, {
      active: false,
    });

    if (!assignor) {
      throw new HttpException('Assignor not found.', HttpStatus.NOT_FOUND);
    }

    return;
  }

  async findAssignorByEmail(email: string): Promise<Assignor> {
    const user = await this.assignorRepository.findAssignorByEmail(email);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
