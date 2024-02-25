import { IPayableDomainService } from './interfaces/payable-service.interface';
import { Payable } from './entities/payable.entity';
import { PayableVO } from './vos/payable.vo';
import { Inject, Injectable } from '@nestjs/common';
import { IPayableRepository } from './interfaces/payable-repository.interface';
import { PayableRepository } from 'bme/core/infra/database/repositories/payable-repository';
import { IAssignorRepository } from '../assignors/interfaces/assignor-repository.interface';
import { AssignorRepository } from 'bme/core/infra/database/repositories/assignor-repository';
import { Assignor } from '../assignors/entities/assignor.entity';
import { Sequence } from 'bme/core/sequence';
import { Fails } from 'bme/core/messages/fails';
import { ErrorDomainService } from 'bme/core/infra/errors/error-domain.service';

@Injectable()
export class PayableDomainService
  extends ErrorDomainService
  implements IPayableDomainService
{
  constructor(
    @Inject(PayableRepository)
    private payableRepo: IPayableRepository,
    @Inject(AssignorRepository)
    private assignorRepo: IAssignorRepository,
  ) {
    super();
  }

  async validate(data: PayableVO): Promise<boolean> {
    const validationError = data.isValid();

    if (validationError) {
      super.addError(validationError);
      return false;
    }

    if (data.assignorId) {
      const assignorExists = await this.assignorRepo.getById<Assignor>(
        data.assignorId,
      );
      if (!assignorExists) {
        super.addError(Fails.INVALID_ASSIGNOR_ID);
        return false;
      }
    }

    return true;
  }

  async getById(id: string): Promise<PayableVO> {
    const result = await this.payableRepo.getById<Payable>(id);

    if (result == null) return null;

    return new PayableVO(
      result.id,
      result.value,
      result.emissionDate,
      result.assignorId,
      null,
    );
  }

  async getAll(): Promise<PayableVO[]> {
    const result = (await this.payableRepo.getAll<Payable>()) ?? [];

    return result.map(
      (x) => new PayableVO(x.id, x.value, x.emissionDate, x.assignorId, null),
    );
  }

  async create(data: PayableVO): Promise<Payable> {
    const isValid = await this.validate(data);
    if (!isValid) return null;

    const createData = new Payable();
    createData.id = data.id ?? Sequence.getNext();
    createData.value = data.value;
    createData.emissionDate = data.emissionDate;
    createData.assignorId = data.assignorId;

    if (data.assignor) {
      const assignorData = new Assignor();
      assignorData.id = data.assignor.id ?? Sequence.getNext();
      assignorData.document = data.assignor.document;
      assignorData.email = data.assignor.email;
      assignorData.phone = data.assignor.phone;
      assignorData.name = data.assignor.name;

      const assignorDb = await this.assignorRepo.create(assignorData);

      createData.assignorId = assignorDb.id;
    }

    return await this.payableRepo.create(createData);
  }

  async removeById(id: string): Promise<PayableVO> {
    const removed = await this.payableRepo.removeById(id);
    if (!removed) return null;

    return new PayableVO(
      removed.id,
      removed.value,
      removed.emissionDate,
      removed.assignorId,
      null,
    );
  }
}
