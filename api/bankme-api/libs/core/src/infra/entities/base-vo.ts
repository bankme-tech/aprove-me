import { IBaseVO } from './base-vo.interface';

export abstract class BaseVO implements IBaseVO {
  // constructor(public readonly id: string) {}
  constructor(
    public readonly id: string,
    public readonly createdAt: Date = new Date(),
    public readonly updateAt: Date = new Date(),
  ) {}

  isValid(): string {
    return null;
  }

  isEqual(data: IBaseVO): boolean {
    return this.id === data.id;
  }
}
