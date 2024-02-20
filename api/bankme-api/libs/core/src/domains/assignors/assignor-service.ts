import { AssignorRepository } from 'bme/core/infra/database/repositories/assignor-repository';
import { Assignor } from './entities/assignor.entity';
import { IAssignorDomainService } from './interfaces/assignor-service.interface';
import { AssignorVO } from './vos/assignor.vo';
import { Inject } from '@nestjs/common';
import { IAssignorRepository } from './interfaces/assignor-repository.interface';
import { Fails } from 'bme/core/messages/fails';
import { Sequence } from 'bme/core/sequence';

export class AssignorDomainService implements IAssignorDomainService {
  constructor(
    @Inject(AssignorRepository)
    private assignorRepo: IAssignorRepository,
  ) {}

  async validate(data: AssignorVO): Promise<string[]> {
    const result = [];
    const resultValidation = await Promise.all([
      this.assignorRepo.documentExists(data.document),
      this.assignorRepo.emailExists(data.email),
    ]);

    if (resultValidation[0]) result.push(Fails.DOCUMENT_ALREADY_EXISTS);
    if (resultValidation[1]) result.push(Fails.EMAIL_ALREADY_EXISTS);

    return result;
  }

  async create(data: AssignorVO): Promise<Assignor> {
    const assignorData = new Assignor();
    assignorData.id = Sequence.getNext();
    assignorData.document = data.document;
    assignorData.email = data.email;
    assignorData.phone = data.phone;
    assignorData.name = data.name;

    return await this.assignorRepo.create(assignorData);
  }

  changeById(id: string, data: AssignorVO): Promise<Assignor> {
    throw new Error('Method not implemented.');
  }
  removeById(id: string): Promise<AssignorVO> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<AssignorVO[]> {
    const result = await this.assignorRepo.getAll<Assignor>();

    return result.map((x) => new AssignorVO(x.id, x.document, x.email, x.name));
  }
}
