import { Notification } from '@core/shared/notification';
import { PayableValue } from '@core/shared/value-objects';

describe('PayableValue', () => {
  it('should add notifications if value is null', () => {
    const notification = new Notification();
    new PayableValue(null, notification);
    expect(notification.getNotifications()).toEqual({
      valor: ['valor não pode ser nulo', 'valor deve ser um número float'],
    });
  });

  it('should add notifications if value is an integer', () => {
    const notification = new Notification();
    new PayableValue(10, notification);
    expect(notification.getNotifications()).toEqual({
      valor: ['valor deve ser um número float'],
    });
  });

  it('should not add notifications if value is a float', () => {
    const notification = new Notification();
    new PayableValue(10.5, notification);
    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for PayableValue', () => {
    const notification = new Notification();
    const value = 100.5;
    const receivableValue = new PayableValue(value, notification);

    expect(receivableValue.getValue()).toBe(value);
  });
});
