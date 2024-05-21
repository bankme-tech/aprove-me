import { IAssignor } from '@domain/assignor/interfaces/assignor.interface';
import { Id } from '@domain/shared/id';

export interface IAssignorConstructor {
  id: Id;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export class Assignor implements IAssignor {
  readonly id: string;
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;

  private constructor(assignor: IAssignor) {
    this.id = assignor.id;
    this.document = assignor.document;
    this.email = assignor.email;
    this.phone = assignor.phone;
    this.name = assignor.name;
    Object.freeze(this);
  }

  static fromExisting(assignor: IAssignor): Assignor {
    return new Assignor(assignor);
  }

  static fromData(assignor: IAssignorConstructor): Assignor {
    return new Assignor({
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
    });
  }

  eq(other: string | IAssignor): boolean {
    if (typeof other === 'string') {
      return this.id === other;
    }
    return this.id === other.id;
  }
}
