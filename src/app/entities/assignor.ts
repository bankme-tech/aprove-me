import { Replace } from '@/utils/replace';
import { randomUUID } from 'crypto';

interface PayableProps {
  document: string;
  email: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface PayablePropsReplaceble {
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assignor {
  public _id: string;
  public props: PayableProps;

  constructor(
    props: Replace<PayablePropsReplaceble, PayablePropsReplaceble>,
    _id?: string,
  ) {
    this._id = _id ? _id : randomUUID();
    this.props = {
      ...this.props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? new Date(),
    };
  }
}
