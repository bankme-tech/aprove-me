import { Replace } from '@/utils/replace';
import { randomUUID } from 'node:crypto';

export interface UserProps {
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ReplaceUserProps {
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public _id: string;
  public props: UserProps;

  constructor(props: Replace<UserProps, ReplaceUserProps>, id?: string) {
    this._id = id ? id : randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }
}
