import { Entity } from '@core/shared/model';
import { Notification } from '@core/shared/notification';
import { Id, PayableValue } from '@core/shared/value-objects';

export type PayableProps = {
  id?: string;
  value: number;
  emissionDate?: Date;
  assignor: string;
};

export class Payable extends Entity<PayableProps> {
  private _value: PayableValue;
  private _emissionDate?: Date;
  private _assignor: Id;

  constructor(props: PayableProps) {
    const notification = new Notification();
    super(props, notification);
    this._notification = notification;

    this._value = new PayableValue(props.value, this._notification);
    this._assignor = new Id(props.assignor, this._notification);
    this._emissionDate = props.emissionDate;
  }

  static create(props: PayableProps): Payable {
    return new Payable({
      id: props.id,
      value: props.value,
      assignor: props.assignor,
      emissionDate: props.emissionDate ?? new Date(),
    });
  }

  get id() {
    return this._id.getValue();
  }

  get value() {
    return this._value.getValue();
  }

  get assignor() {
    return this._assignor.getValue();
  }

  get emissionDate() {
    return this._emissionDate;
  }

  get notifications() {
    return this.getNotifications();
  }

  get containNotifications() {
    return this.hasNotifications();
  }
}
