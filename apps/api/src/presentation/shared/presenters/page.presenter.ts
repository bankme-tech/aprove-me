/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IPage } from '@domain/shared/page.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function PagePresenter<T>(type: Type<T>) {
  class P implements IPage<T> {
    @ApiProperty({ example: true })
    readonly hasNextPage: boolean;

    @ApiProperty({ example: 1 })
    readonly page: number;

    @ApiProperty({ example: 10 })
    readonly limit: number;

    @ApiProperty({ example: 100 })
    readonly totalCount: number;

    @ApiProperty({ type, isArray: true })
    readonly data: T[];

    constructor(page: IPage<unknown>) {
      this.hasNextPage = page.hasNextPage;
      this.page = page.page;
      this.limit = page.limit;
      this.totalCount = page.totalCount;
      this.data = page.data.map((item) => new type(item));
    }
  }
  return P;
}
