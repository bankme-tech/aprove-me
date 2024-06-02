import { Email } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

describe('Email', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('should add notifications if email is null', () => {
    new Email(null as any, notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      email: [
        'não pode ser nulo',
        'não pode ser vazio',
        'não pode exceder 140 caracteres',
      ],
    });
  });

  it('should add notification if email is empty', () => {
    new Email('', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      email: ['não pode ser vazio'],
    });
  });

  it('should add notification if email length is more than 140', () => {
    new Email('a'.repeat(141) + '@example.com', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      email: ['não pode exceder 140 caracteres'],
    });
  });

  it('should not add notifications for a valid email', () => {
    new Email('valid@example.com', notification);
    expect(notification.hasNotifications()).toBe(false);
    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for Email', () => {
    const notification = new Notification();
    const emailValue = 'example@example.com';
    const email = new Email(emailValue, notification);

    expect(email.getValue()).toBe(emailValue);
  });
});
