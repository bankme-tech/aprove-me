import { Replace } from '@/utils/replace';
import { randomUUID } from 'crypto';

interface PayableProps {
  value: number;
  assignorId: string;
  emissionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface PayablePropsReplaceble {
  emissionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Payable {
  public _id: string;
  public props: PayableProps;

  constructor(
    props: Replace<PayablePropsReplaceble, PayablePropsReplaceble>,
    _id?: string,
  ) {
    this._id = _id ? _id : randomUUID();
    this.props = {
      ...this.props,
      emissionDate: props.emissionDate ?? new Date(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? new Date(),
    };
  }
}
