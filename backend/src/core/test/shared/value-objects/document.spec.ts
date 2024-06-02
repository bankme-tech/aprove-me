import { Notification } from '@core/shared/notification';
import { Document } from '@core/shared/value-objects';

describe('Document', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('should add notifications if value is null', () => {
    new Document(null as any, notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      documento: [
        'não pode ser nulo',
        'não pode estar vazio',
        'deve ter no máximo 30 caracteres',
      ],
    });
  });

  it('should add notification if value is empty', () => {
    new Document('', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      documento: ['não pode estar vazio'],
    });
  });

  it('should add notification if value exceeds maximum length', () => {
    new Document('12345678901234567890123456789012345678901', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      documento: ['deve ter no máximo 30 caracteres'],
    });
  });

  it('should not add notifications if value is valid', () => {
    new Document('123456789012345678901234567890', notification);
    expect(notification.hasNotifications()).toBe(false);
    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for Document', () => {
    const notification = new Notification();
    const documentValue = 'ABC123';
    const document = new Document(documentValue, notification);

    expect(document.getValue()).toBe(documentValue);
  });
});
