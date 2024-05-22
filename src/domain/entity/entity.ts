import { UniqueEntityIdVO } from '../common/value-object';

export abstract class Entity {
  readonly id: any;

  abstract toJSON(): any;

  equals(obj: this) {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (obj.id === undefined) {
      return false;
    }

    if (obj.constructor.name !== this.constructor.name) {
      return false;
    }

    return obj.id.equals(this.id);
  }
}
