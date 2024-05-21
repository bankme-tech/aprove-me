import { Injectable } from '@nestjs/common';

import { Assignor } from '@domain/assignor/models/assignor';

@Injectable()
export class FindOneAssignorUseCase {
  async find(assignor: Assignor): Promise<Assignor> {
    return assignor;
  }
}
