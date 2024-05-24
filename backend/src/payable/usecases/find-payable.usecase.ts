import { Injectable } from '@nestjs/common';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { PayableEntity } from '../entities/payable.entity';
import { IFindPayableUseCase } from './find-payable.usecase.interface';
import { FindPayableInputDTO } from '../dto/find-payable.input.dto';

@Injectable()
export class FindPayableUseCase implements IFindPayableUseCase {
  constructor(private readonly assignorRepository: IPayableRepository) {}

  async execute(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity> {
    return await this.assignorRepository.findById(findPayableDTO);
  }
}
