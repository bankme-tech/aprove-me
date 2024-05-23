import { ReceivableEntity } from '../domain/entity';
import { IReceivableRepository } from '../domain/repository';
import { ReceivableNotFoundException } from '../domain/common/exception';

export class GetPayableUsecase {
  constructor(private readonly receivableRepo: IReceivableRepository) {}

  async execute(id: string): Promise<ReceivableEntity> {
    const receivable = await this.receivableRepo.findById(id);

    if (!receivable) throw new ReceivableNotFoundException(id);

    return receivable;
  }
}
