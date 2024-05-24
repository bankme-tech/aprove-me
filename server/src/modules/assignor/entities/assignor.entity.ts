import { Payable } from '@modules/payable/entities/payable.entity';
import { BaseEntity, BaseEntityProps } from '@modules/shared/base.entity';

export interface AssignorProps extends BaseEntityProps {
  document: string;
  email: string;
  phone: string;
  name: string;
  payables: Payable[];
  createdAt?: Date;
}

export class Assignor extends BaseEntity<AssignorProps> {
  get document(): string {
    return this.props.document;
  }

  set document(value: string) {
    this.props.document = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get payables(): Payable[] {
    return this.props.payables;
  }

  set payables(value: Payable[]) {
    this.props.payables = value;
  }
}
