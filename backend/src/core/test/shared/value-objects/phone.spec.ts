import { Phone } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

describe('Phone', () => {
  it('should add notifications if value is null', () => {
    const notification = new Notification();
    new Phone(null as any, notification);

    const expectedNotifications = {
      phone: [
        'não pode ser null',
        'não pode estar vazio',
        'não pode ter mais de 20 caracteres',
      ],
    };

    expect(notification.getNotifications()).toEqual(expectedNotifications);
  });

  it('should add notifications if value is empty', () => {
    const notification = new Notification();
    new Phone('', notification);

    const expectedNotifications = {
      phone: ['não pode estar vazio'],
    };

    expect(notification.getNotifications()).toEqual(expectedNotifications);
  });

  it('should add notifications if value length is greater than 20', () => {
    const notification = new Notification();
    new Phone('123456789012345678901', notification);

    const expectedNotifications = {
      phone: ['não pode ter mais de 20 caracteres'],
    };

    expect(notification.getNotifications()).toEqual(expectedNotifications);
  });

  it('should not add notifications if value is valid', () => {
    const notification = new Notification();
    new Phone('12345678901234567890', notification);

    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for Phone', () => {
    const notification = new Notification();
    const phoneValue = '123456789';
    const phone = new Phone(phoneValue, notification);

    expect(phone.getValue()).toBe(phoneValue);
  });
});
