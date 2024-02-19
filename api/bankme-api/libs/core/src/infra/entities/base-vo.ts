import { IBaseVO } from './base-vo.interface';

export abstract class BaseVO implements IBaseVO {
  constructor(public readonly id: string) {}

  isValid(): string {
    return null;
  }

  isEqual(data: IBaseVO): Boolean {
    return this.id === data.id;
  }
}
