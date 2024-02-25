import { AssignorRepository } from 'bme/core/infra/database/repositories/assignor-repository';
import { Assignor } from './entities/assignor.entity';
import { IAssignorDomainService } from './interfaces/assignor-service.interface';
import { AssignorVO } from './vos/assignor.vo';
import { Inject, Injectable } from '@nestjs/common';
import { IAssignorRepository } from './interfaces/assignor-repository.interface';
import { Fails } from 'bme/core/messages/fails';
import { Sequence } from 'bme/core/sequence';
import { ErrorDomainService } from 'bme/core/infra/errors/error-domain.service';
import { BasicValidations } from 'bme/core/basic-validations';

@Injectable()
export class AssignorDomainService
  extends ErrorDomainService
  implements IAssignorDomainService
{
  constructor(
    @Inject(AssignorRepository)
    private assignorRepo: IAssignorRepository,
  ) {
    super();
  }

  async validate(data: AssignorVO): Promise<boolean> {
    if (!BasicValidations.isValidCNPJOrCPF(data.document))
      super.addError(Fails.INVALID_DOCUMENT);

    const resultValidation = await Promise.all([
      this.assignorRepo.documentExists(data.document),
      this.assignorRepo.emailExists(data.email),
    ]);

    if (resultValidation[0]) super.addError(Fails.DOCUMENT_ALREADY_EXISTS);
    if (resultValidation[1]) super.addError(Fails.EMAIL_ALREADY_EXISTS);

    return !super.getErrors().length;
  }

  async create(data: AssignorVO): Promise<Assignor> {
    const isValid = await this.validate(data);
    if (!isValid) return null;

    const assignorData = new Assignor();
    assignorData.id = data.id ?? Sequence.getNext();
    assignorData.document = data.document;
    assignorData.email = data.email;
    assignorData.phone = data.phone;
    assignorData.name = data.name;

    return await this.assignorRepo.create(assignorData);
  }

  async getAll(): Promise<AssignorVO[]> {
    const result = await this.assignorRepo.getAll<Assignor>();

    return result.map(
      (x) => new AssignorVO(x.id, x.document, x.email, x.phone, x.name),
    );
  }

  async getById(id: string): Promise<AssignorVO> {
    const result = await this.assignorRepo.getById<Assignor>(id);

    if (result == null) return null;

    return new AssignorVO(
      result.id,
      result.document,
      result.email,
      result.phone,
      result.name,
    );
  }

  async removeById(id: string): Promise<AssignorVO> {
    const removed = await this.assignorRepo.removeById(id);
    if (!removed) return null;

    return new AssignorVO(
      removed.id,
      removed.document,
      removed.email,
      removed.phone,
      removed.name,
    );
  }
}
