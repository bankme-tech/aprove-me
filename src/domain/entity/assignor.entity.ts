import { AggregateRoot } from './aggregate-root';

import { InvalidFieldException } from '../common/exception';
import {
  CnpjVO,
  CpfVO,
  EmailVO,
  PhoneVO,
  UniqueEntityIdVO,
} from '../common/value-object';
import { ReceivableProps, ReceivableEntity } from './receivable.entity';

export type AssignorProps = {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

export class AssignorEntity extends AggregateRoot {
  readonly id: UniqueEntityIdVO;
  readonly document: CpfVO | CnpjVO;
  readonly email: EmailVO;
  readonly phone: PhoneVO;
  readonly name: string;
  private _receivables: ReceivableEntity[];

  constructor(props: AssignorProps) {
    super();
    this.id = props.id
      ? new UniqueEntityIdVO(props.id)
      : new UniqueEntityIdVO();
    this.document = this.applyDocument(props.document);
    this.email = new EmailVO(props.email);
    this.phone = new PhoneVO(props.phone);
    this.name = props.name;
    this._receivables = [];
  }

  static create(props: Omit<AssignorProps, 'id'>): AssignorEntity {
    return new AssignorEntity(props);
  }

  addReceivable(command: ReceivableProps): void {
    this._receivables.push(ReceivableEntity.create(command));
  }

  get receivables(): ReceivableEntity[] {
    return this._receivables;
  }

  toJSON() {
    return {
      id: this.id.value,
      document: this.document.toString(),
      email: this.email.value,
      phone: this.phone.toString(),
      name: this.name,
      receivables: this._receivables?.map((receivable) => receivable.toJSON()),
    };
  }

  private applyDocument(value: string): CpfVO | CnpjVO {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length === 11) return new CpfVO(cleanValue);
    if (cleanValue.length === 14) return new CnpjVO(cleanValue);

    throw new InvalidFieldException('document');
  }
}
