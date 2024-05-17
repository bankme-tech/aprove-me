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
  private _id: string;
  private props: PayableProps;

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

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  get value(): number {
    return this.props.value;
  }

  set value(newValue: number) {
    this.props.value = newValue;
  }

  get assignorId(): string {
    return this.props.assignorId;
  }

  set assignorId(newAssignorId: string) {
    this.props.assignorId = newAssignorId;
  }

  get emissionDate(): Date {
    return this.props.emissionDate;
  }

  set emissionDate(newEmissionDate: Date) {
    this.props.emissionDate = newEmissionDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(newCreatedAt: Date) {
    this.props.createdAt = newCreatedAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(newUpdatedAt: Date) {
    this.props.updatedAt = newUpdatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  set deletedAt(newDeletedAt: Date) {
    this.props.deletedAt = newDeletedAt;
  }
}
