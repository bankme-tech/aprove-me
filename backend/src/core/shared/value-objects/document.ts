import { Notification } from '@core/shared/notification';

export class Document {
  private _value: string;
  private _context: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this._context = 'documento';
    this.validate(notification);
  }

  private validate(notification: Notification) {
    const commonMessages = [
      'não pode ser nulo',
      'não pode estar vazio',
      'deve ter no máximo 30 caracteres',
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

    if (this._value.trim().length === 0) {
      notification.addNotification({
        context: this._context,
        message: commonMessages[1]!,
      });
    }

    if (this._value.length > 30) {
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
