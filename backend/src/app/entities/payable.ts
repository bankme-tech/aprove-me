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

type UpdatePayableProps = Omit<
  PayableProps,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

interface PayablePropsReplaceble {
  emissionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payable {
  public _id: string;
  public props: PayableProps;

  constructor(
    props: Replace<PayableProps, PayablePropsReplaceble>,
    _id?: string,
  ) {
    this._id = _id ? _id : randomUUID();
    this.props = {
      ...props,
      emissionDate: props.emissionDate ?? new Date(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public updatePayable(input: UpdatePayableProps): void {
    this.props.value = input.value;
    this.props.emissionDate = input.emissionDate;
    this.props.assignorId = input.assignorId;
  }
}
