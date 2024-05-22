import { Inject, Injectable } from '@nestjs/common';

import { Assignor } from '@bankme/domain';

import { IUpdateAssignor } from '@domain/assignor/interfaces/update-assignor.interface';

import {
  ASSIGNOR_REPOSITORY,
  IAssignorRepository,
} from '@infra/assignor/repositories/assignor.repository';

@Injectable()
export class UpdateOneAssignorUseCase {
  constructor(
    @Inject(ASSIGNOR_REPOSITORY)
    private readonly _repository: IAssignorRepository,
  ) {}

  async update(data: IUpdateAssignor, assignor: Assignor): Promise<Assignor> {
    return this._repository.save(
      Assignor.fromExisting({
        ...assignor,
        ...data,
      }),
    );
  }
}
