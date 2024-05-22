import { ApiProperty } from '@nestjs/swagger';

import { IAssignor } from '@bankme/domain';

import { randomUUID } from 'crypto';

export class AssignorPresenter {
  @ApiProperty({ example: randomUUID() })
  readonly id: string;

  @ApiProperty({ example: '37872471060' })
  readonly document: string;

  @ApiProperty({ example: '' })
  readonly email: string;

  @ApiProperty({ example: '15988776655' })
  readonly phone: string;

  @ApiProperty({ example: 'Jane Doe' })
  readonly name: string;

  constructor(assignor: IAssignor) {
    this.id = assignor.id;
    this.document = assignor.document;
    this.email = assignor.email;
    this.phone = assignor.phone;
    this.name = assignor.name;
    Object.freeze(this);
  }
}
