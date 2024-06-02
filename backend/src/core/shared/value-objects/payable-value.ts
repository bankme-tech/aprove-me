import { Notification } from '@core/shared/notification';

export class PayableValue {
  private _value: number | null;
  private _context: string;

  constructor(value: number | null, notification: Notification) {
    this._value = value;
    this._context = 'valor';
    this.validate(notification);
  }

  private validate(notification: Notification) {
    const commonMessages = [
      'valor não pode ser nulo',
      'valor deve ser um número float',
    ];

    if (this._value === null) {
      commonMessages.forEach((message) => {
        notification.addNotification({
          context: this._context,
          message,
        });
      });
      return;
    }

    if (Number.isInteger(this._value)) {
      notification.addNotification({
        context: this._context,
        message: commonMessages[1]!,
      });
    }
  }

  getValue() {
    return this._value;
  }
}
