import { Injectable } from '@nestjs/common';

import { Assignor } from '@bankme/domain';

@Injectable()
export class FindOneAssignorUseCase {
  async find(assignor: Assignor): Promise<Assignor> {
    return assignor;
  }
}
