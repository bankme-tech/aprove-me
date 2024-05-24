import { randomUUID } from 'crypto';

export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
}

export abstract class BaseEntity<T extends BaseEntityProps> {
  private _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  static create<U extends BaseEntityProps, T extends BaseEntity<U>>(
    this: new (props: U, id?: string) => T,
    props: U,
    id?: string,
  ): T {
    return new this(props, id);
  }
}
