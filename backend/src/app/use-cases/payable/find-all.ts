import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  skip: number;
  take: number;
}

interface Output {
  payables: Payable[];
  totalPayables: number;
  totalPages: number;
}

@Injectable()
export class FindAll {
  constructor(private payableRepository: PayableRepository) {}

  async execute(input: Input): Promise<Output> {
    const [payables, totalPayables] = await Promise.all([
      this.payableRepository.findAll(input.skip, input.take),
      this.payableRepository.count(),
    ]);

    const totalPages = Math.ceil(totalPayables / input.take);

    return { payables, totalPayables, totalPages };
  }
}
