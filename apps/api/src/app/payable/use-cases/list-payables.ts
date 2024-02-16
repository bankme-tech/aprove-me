import { PayableRepository } from '@/database/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { Either, right } from '@util/either';

type ListPayablesUseCaseResponse = Either<
  null,
  {
    payables: Payable[];
  }
>;

@Injectable()
export class ListPayablesUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute(): Promise<ListPayablesUseCaseResponse> {
    const payables = await this.payableRepository.findAll();

    return right({ payables });
  }
}
