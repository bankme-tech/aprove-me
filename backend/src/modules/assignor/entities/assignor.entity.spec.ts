import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';
import { AssignorEntity } from './assignor.entity';
import { faker } from '@faker-js/faker';

describe('AssignorEntity', () => {
  let baseEntry = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    document: '123.456.789-00',
    phone: '+55 11 90000-0000',
  };

  beforeEach(() => {
    baseEntry = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-00',
      phone: '+55 11 90000-0000',
    };
  });

  it('should create an assignor entity', () => {
    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isRight()).toBeTruthy();
  });

  it('should not create an assignor entity with NAME more than maximum characters', () => {
    baseEntry.name = faker.string.alpha(150);

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual('Name overtook 140 characters.');
    }
  });

  it('should not create an assignor entity with DOCUMENT more than maximum characters', () => {
    baseEntry.document = faker.string.alpha(50);

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual(
        'Document overtook 30 characters.',
      );
    }
  });

  it('should not create an assignor entity with EMAIL more than maximum characters', () => {
    baseEntry.email = faker.string.alpha(150);

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual('Email overtook 140 characters.');
    }
  });

  it('should not create an assignor entity with PHONE more than maximum characters', () => {
    baseEntry.phone = faker.string.alpha(31);

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual('Phone overtook 20 characters.');
    }
  });

  it('should not create an assignor entity with invalid email', () => {
    baseEntry.email = 'invalid-email';

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual('You must provide a valid email.');
    }
  });

  it('should not create an assignor entity when phone does not start with +', () => {
    baseEntry.phone = '11 90000-0000';

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual(
        'Your phone must starts with + and country code.',
      );
    }
  });

  it('should not create an assignor entity with invalid phone', () => {
    baseEntry.phone = '+invalid-phone';

    const assignor = AssignorEntity.create(baseEntry);

    expect(assignor.isLeft()).toBeTruthy();

    if (assignor.isLeft()) {
      expect(assignor.value).toBeInstanceOf(InvalidEntityEntry);

      expect(assignor.value.message).toEqual('You must provide a valid phone.');
    }
  });
});
