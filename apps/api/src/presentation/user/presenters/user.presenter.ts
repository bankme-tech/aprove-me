import { ApiProperty } from '@nestjs/swagger';

import { Id } from '@domain/shared/id';
import { IUser } from '@domain/user/interfaces/user.interface';

export class UserPresenter {
  @ApiProperty({ example: '660824bffc69a69538084cf9' })
  readonly id: Id;

  @ApiProperty({ example: 'jane.doe' })
  readonly username: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    Object.freeze(this);
  }
}
