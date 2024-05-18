import { IPayable } from '../types/IPayables';

export default class Payable implements IPayable {
  private _id: string;
  private _value: number;
  private _emissionDate: Date;
  private _assignorId: string;

  constructor(
    id?: string,
    value?: number,
    emissionDate?: Date,
    assignorId?: string,
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get emissionDate(): Date {
    return this._emissionDate;
  }

  set emissionDate(emissionDate: Date) {
    this._emissionDate = emissionDate;
  }

  get assignorId(): string {
    return this._assignorId;
  }

  set assignorId(assignor: string) {
    this._assignorId = assignor;
  }

  toCreate() {
    return {
      value: this.value,
      emissionDate: new Date(this.emissionDate),
      assignorId: this.assignorId,
    };
  }

  toJSON() {
    return {
      id: this.id,
      value: this.value,
      emissionDate: this.emissionDate,
      assignorId: this.assignorId,
    };
  }
}
