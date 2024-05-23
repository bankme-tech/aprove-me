import { Injectable } from '@nestjs/common';
import { IAssignorRepository } from '../repositories/assignor.repository.interface';
import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';
import { ICreateAssignorUseCase } from './create-assignor.usecase.interface';
import { CreateAssignorOutputDTO } from '../dto/create-assignor.ouput.dto';

@Injectable()
export class CreateAssignorUseCase implements ICreateAssignorUseCase {
  constructor(private readonly assignorRepository: IAssignorRepository) {}

  async execute(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<CreateAssignorOutputDTO> {
    return await this.assignorRepository.save(createAssignorDTO);
  }
}
