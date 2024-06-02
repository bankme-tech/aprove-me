import { randomUUID } from 'node:crypto';
import { Notification } from '@core/shared/notification';

export class Id {
  protected readonly _value: string;

  constructor(value?: string, notification?: Notification) {
    this._value = value ?? randomUUID();
    if (!Id.isValidUUID(this._value)) {
      notification?.addNotification({
        context: 'id',
        message: 'deve ser do tipo UUID',
      });
    }
  }

  getValue() {
    return this._value;
  }

  static isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
