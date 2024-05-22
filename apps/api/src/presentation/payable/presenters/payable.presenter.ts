import { ApiProperty } from '@nestjs/swagger';

import { IPayable } from '@bankme/domain';
import { Id } from '@bankme/domain';

import { AssignorPresenter } from '@presentation/assignor/presenters/assignor.presenter';

import { randomUUID } from 'crypto';

export class PayablePresenter {
  @ApiProperty({ example: randomUUID() })
  readonly id: Id;

  @ApiProperty({ example: 100.21 })
  readonly value: number;

  @ApiProperty({ example: new Date() })
  readonly emissionDate: Date;

  @ApiProperty({ type: AssignorPresenter })
  readonly assignor: AssignorPresenter;

  constructor(payable: IPayable) {
    this.id = payable.id;
    this.value = payable.value;
    this.emissionDate = new Date(payable.emissionDate);
    this.assignor = new AssignorPresenter(payable.assignor);
    Object.freeze(this);
  }
}
