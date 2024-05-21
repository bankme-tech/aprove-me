import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { Id } from '@domain/shared/id';
import { IAssignor } from '@domain/assignor/interfaces/assignor.interface';
import { AssignorNotFoundException } from '@domain/assignor/exceptions/payable-not-found.exception';

import {
  ASSIGNOR_REPOSITORY,
  IAssignorRepository,
} from '@infra/assignor/repositories/assignor.repository';

@Injectable()
export class AssignorByIdPipe
  implements PipeTransform<Id, Promise<IAssignor | null>>
{
  constructor(
    @Inject(ASSIGNOR_REPOSITORY)
    private readonly _repository: IAssignorRepository,
  ) {}

  async transform(id: Id): Promise<IAssignor | null> {
    return this._findAssignorByIdOrThrow(id);
  }

  private async _findAssignorByIdOrThrow(id: Id): Promise<IAssignor> {
    const user = await this._repository.findOneById(id);
    if (user.isNone()) {
      throw AssignorNotFoundException.withId(id);
    }
    return user.value;
  }
}
