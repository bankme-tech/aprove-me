import { Replace } from '@/utils/replace';
import { randomUUID } from 'crypto';

export interface AssignorProps {
  document: string;
  email: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type UpdateAssignorProps = Omit<
  AssignorProps,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

interface AssignorPropsReplaceble {
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assignor {
  public _id: string;
  public props: AssignorProps;

  constructor(
    props: Replace<AssignorProps, AssignorPropsReplaceble>,
    _id?: string,
  ) {
    this._id = _id ? _id : randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public updateAssignor(input: UpdateAssignorProps): void {
    this.props.name = input.name;
    this.props.email = input.email;
    this.props.phone = input.phone;
    this.props.document = input.document;
  }
}
