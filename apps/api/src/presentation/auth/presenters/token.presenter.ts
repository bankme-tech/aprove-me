import { ApiProperty } from '@nestjs/swagger';

import { IToken } from '@bankme/domain';

export class TokenPresenter {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU3MTVjOGUxLWMyMmItNDUwOS04NWZhLWM0MGQ2ZDUyZTMwMyIsImlhdCI6MTY2MjQxMDg5NSwiZXhwIjoxNjkzOTY4NDk1fQ.IZlYZAwvaUBKkaRyJ2r2PhcUqldKeWsJIuXr8oCheLo',
  })
  accessToken: string;

  constructor({ accessToken }: IToken) {
    this.accessToken = accessToken;
    Object.freeze(this);
  }
}
