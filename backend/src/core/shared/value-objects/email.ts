import { Notification } from '@core/shared/notification';

export class Email {
  private _value: string;
  private _context: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this._context = 'email';
    this.validate(notification);
  }

  private validate(notification: Notification): void {
    const commonMessages = [
      'não pode ser nulo',
      'não pode ser vazio',
      'não pode exceder 140 caracteres',
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

    if (this._value.trim() === '') {
      notification.addNotification({
        context: this._context,
        message: commonMessages[1]!,
      });
    }

    if (this._value.length > 140) {
      notification.addNotification({
        context: this._context,
        message: commonMessages[2]!,
      });
    }
  }

  getValue(): string {
    return this._value;
  }
}
