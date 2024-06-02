import { Id } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

describe('Value Object - Id', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  describe('constructor', () => {
    it('should create a new Id with a random value if no value is provided', () => {
      const id = new Id();
      expect(id.getValue()).toBeDefined();
      expect(typeof id.getValue()).toBe('string');
      expect(Id.isValidUUID(id.getValue())).toBe(true);
    });

    it('should create a new Id with the provided valid value', () => {
      const providedValue = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
      const id = new Id(providedValue);
      expect(id.getValue()).toBe(providedValue);
      expect(Id.isValidUUID(id.getValue())).toBe(true);
    });

    it('should not create a new Id and should add a notification if provided value is invalid', () => {
      const invalidValue = 'invalid-value';
      new Id(invalidValue, notification);
      expect(notification.hasNotifications()).toBe(true);
    });

    it('should add a notification with correct message if provided value is invalid', () => {
      const invalidValue = 'invalid-value';
      new Id(invalidValue, notification);

      expect(notification.hasNotifications()).toBe(true);
      expect(notification.getNotifications()).toEqual({
        id: ['deve ser do tipo UUID'],
      });
    });
  });
});
