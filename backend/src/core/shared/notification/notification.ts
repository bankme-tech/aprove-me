export type NotificationsErrorProps = {
  message: string;
  context: string;
};

type NotificationType = {
  hasNotifications(): boolean;
  getNotifications(): { [key: string]: string[] };
  addNotification(notification: NotificationsErrorProps): void;
};

export class Notification implements NotificationType {
  protected notifications: NotificationsErrorProps[] = [];

  addNotification(notification: NotificationsErrorProps): void {
    this.notifications.push(notification);
  }

  hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  getNotifications(): { [key: string]: string[] } {
    return this.notifications.reduce(
      (acc, notification) => {
        if (!acc[notification.context]) {
          acc[notification.context] = [];
        }
        acc[notification.context]?.push(notification.message);
        return acc;
      },
      {} as { [key: string]: string[] },
    );
  }
}
