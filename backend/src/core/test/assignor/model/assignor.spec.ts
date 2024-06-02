import { Assignor } from '@core/assignor/model/assignor';
import { AssignorDataBuilder } from '@core/test/__mocks__/data-builder';

describe('Assignor Domain Model', () => {
  const props = AssignorDataBuilder.anAssignor().build();

  describe('constructor', () => {
    it('should add notification if document is invalid', () => {
      const props = AssignorDataBuilder.anAssignor().withDocument('').build();

      const assignor = Assignor.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        documento: ['não pode estar vazio'],
      });
    });

    it('should add notification if email is invalid', () => {
      const props = AssignorDataBuilder.anAssignor().withEmail('').build();

      const assignor = Assignor.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        email: ['não pode ser vazio'],
      });
    });

    it('should add notification if phone is invalid', () => {
      const props = AssignorDataBuilder.anAssignor().withPhone('').build();

      const assignor = Assignor.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        phone: ['não pode estar vazio'],
      });
    });

    it('should add notification if name is invalid', () => {
      const props = AssignorDataBuilder.anAssignor().withName('').build();

      const assignor = Assignor.create(props);

      expect(assignor.containNotifications).toBe(true);
      expect(assignor.notifications).toEqual({
        name: ['não pode estar vazio'],
      });
    });

    it('should create a new Assignor with valid properties', () => {
      const assignor = Assignor.create(props);

      expect(assignor.document).toBe(props.document);
      expect(assignor.email).toBe(props.email);
      expect(assignor.phone).toBe(props.phone);
      expect(assignor.name).toBe(props.name);
      expect(assignor.containNotifications).toBe(false);
    });
  });

  describe('getters', () => {
    it('should return the correct id', () => {
      const assignor = Assignor.create(props);

      const id = assignor.id;

      expect(id).toBe(assignor.id);
      expect(assignor.containNotifications).toBe(false);
    });

    it('should return the correct document', () => {
      const assignor = Assignor.create(props);

      expect(assignor.document).toBe(props.document);
    });

    it('should return the correct email', () => {
      const assignor = Assignor.create(props);

      expect(assignor.email).toBe(props.email);
    });

    it('should return the correct phone', () => {
      const assignor = Assignor.create(props);

      expect(assignor.phone).toBe(props.phone);
    });

    it('should return the correct name', () => {
      const assignor = Assignor.create(props);

      expect(assignor.name).toBe(props.name);
    });
  });

  describe('update', () => {
    it('should update assignor with valid properties', () => {
      const assignor = Assignor.create(props);

      const newAssignorProps = AssignorDataBuilder.anAssignor()
        .withName('New Assignor')
        .withEmail('new@example.com')
        .withPhone('(99) 99999-9999')
        .withDocument('999.999.999-99')
        .build();

      assignor.update(newAssignorProps);

      expect(assignor.document).toBe(newAssignorProps.document);
      expect(assignor.email).toBe(newAssignorProps.email);
      expect(assignor.phone).toBe(newAssignorProps.phone);
      expect(assignor.name).toBe(newAssignorProps.name);
    });
  });
});
