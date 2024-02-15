import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { ReceivableRepository } from 'src/repositories';

@Injectable()
export class DeleteReceivableUseCase implements UseCase<string, void> {
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(input: string): Promise<void> {
    const receivable = await this.receivableRepository.findById(input);

    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }

    await this.receivableRepository.delete(input);
  }
}
