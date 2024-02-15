import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { AssignorRepository, ReceivableRepository } from 'src/repositories';

@Injectable()
export class DeleteAssignorUseCase implements UseCase<string, void> {
  constructor(
    private readonly assignorRepository: AssignorRepository,
    private readonly receivableRepository: ReceivableRepository,
  ) {}

  async execute(input: string): Promise<void> {
    const assignor = await this.assignorRepository.findById(input);

    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    await this.assignorRepository.delete(input);
    await this.receivableRepository.deleteMany(input);
  }
}
