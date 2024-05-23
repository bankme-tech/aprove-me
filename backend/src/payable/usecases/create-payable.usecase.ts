import { IPayableRepository as IPayableRepository } from '../repositories/payable.repository.interface';
import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { Injectable } from '@nestjs/common';
import { CreatePayableOutputDTO } from '../dto/create-payable.output.dto';
import { ICreatePayableUseCase } from './create-payable.usecase.interface';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

@Injectable()
export class CreatePayableUseCase implements ICreatePayableUseCase {
  constructor(
    private readonly payableRepository: IPayableRepository,
    private readonly assignorRepository: IAssignorRepository,
  ) {}

  async execute(
    createPayableDTO: CreatePayableInputDTO,
  ): Promise<CreatePayableOutputDTO> {
    const assignor = await this.assignorRepository.findById(
      createPayableDTO.assignorId,
    );
    if (!assignor) {
      throw new RecordNotFoundError('Assignor');
    }

    return await this.payableRepository.save(createPayableDTO);
  }
}
