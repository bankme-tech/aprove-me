import { Id } from '@core/shared/value-objects';
import {
  Notification,
  NotificationsErrorProps,
} from '@core/shared/notification';

type EntityProps = {
  id?: string;
};

export class Entity<T> {
  protected _id: Id;
  protected _notification: Notification;

  constructor(props: T & EntityProps, notification: Notification) {
    this._id = new Id(props?.id);
    this._notification = notification;
  }

  protected addNotification(notification: NotificationsErrorProps): void {
    this._notification.addNotification(notification);
  }

  protected hasNotifications(): boolean {
    return this._notification.hasNotifications();
  }

  protected getNotifications(): { [key: string]: string[] } {
    return this._notification.getNotifications();
  }
}
