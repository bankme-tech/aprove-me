import { Notification } from '@core/shared/notification';

export class Phone {
  private _value: string;
  private _context: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this._context = 'phone';
    this.validate(notification);
  }

  private validate(notification: Notification) {
    const commonMessages = [
      'não pode ser null',
      'não pode estar vazio',
      'não pode ter mais de 20 caracteres',
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

    if (this._value.length > 20) {
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
