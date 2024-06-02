import { Entity } from '@core/shared/model';
import { Id } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

interface DummyEntityProps {
  name: string;
}

class DummyEntity extends Entity<DummyEntityProps> {
  constructor(
    props: DummyEntityProps & { id?: string },
    notification: Notification,
  ) {
    super(props, notification);
  }

  get id() {
    return this._id.getValue();
  }

  get notification() {
    return this._notification;
  }

  addDummyNotification(notification: { context: string; message: string }) {
    this.addNotification(notification);
  }

  hasDummyNotifications() {
    return this.hasNotifications();
  }

  getDummyNotifications() {
    return this.getNotifications();
  }
}

describe('Entity Base Class', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('should create a new entity with a random ID if no ID is provided', () => {
    const entity = new DummyEntity({ name: 'Test Entity' }, notification);
    expect(entity.id).toBeDefined();
    expect(Id.isValidUUID(entity.id)).toBe(true);
  });

  it('should create a new entity with the provided ID', () => {
    const providedId = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
    const entity = new DummyEntity(
      { name: 'Test Entity', id: providedId },
      notification,
    );
    expect(entity.id).toBe(providedId);
  });

  it('should add a notification', () => {
    const entity = new DummyEntity({ name: 'Test Entity' }, notification);
    const notificationProps = { context: 'test', message: 'test notification' };
    entity.addDummyNotification(notificationProps);

    expect(entity.hasDummyNotifications()).toBe(true);
    expect(entity.getDummyNotifications()).toEqual({
      test: ['test notification'],
    });
  });

  it('should check for notifications correctly', () => {
    const entity = new DummyEntity({ name: 'Test Entity' }, notification);
    expect(entity.hasDummyNotifications()).toBe(false);

    const notificationProps = { context: 'test', message: 'test notification' };
    entity.addDummyNotification(notificationProps);

    expect(entity.hasDummyNotifications()).toBe(true);
  });
});
