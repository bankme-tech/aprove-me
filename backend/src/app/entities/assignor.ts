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
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assignor {
  public _id: string;
  public props: PayableProps;

  constructor(
    props: Replace<PayableProps, PayablePropsReplaceble>,
    _id?: string,
  ) {
    this._id = _id ? _id : randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }
}
