import { IAssignor } from '@domain/assignor/interfaces/assignor.interface';
import { Assignor } from '@domain/assignor/models/assignor';
import { IPayable } from '@domain/payable/interfaces/payable.interface';
import { Id } from '@domain/shared/id';

export interface IPayableConstructor {
  id: Id;
  value: number;
  emissionDate: number | string | Date;
  assignor: IAssignor;
}

export class Payable implements IPayable {
  readonly id: Id;
  readonly value: number;
  readonly emissionDate: Date;
  readonly assignor: Assignor;

  private constructor(payable: IPayable) {
    this.id = payable.id;
    this.value = payable.value;
    this.emissionDate = payable.emissionDate;
    this.assignor = Assignor.fromExisting(payable.assignor);
    Object.freeze(this);
  }

  static fromExisting(payable: IPayable): Payable {
    return new Payable(payable);
  }

  static fromData(payable: IPayableConstructor): Payable {
    return new Payable({
      id: payable.id,
      value: payable.value,
      emissionDate: new Date(payable.emissionDate),
      assignor: payable.assignor,
    });
  }

  eq(other: string | IPayable): boolean {
    if (typeof other === 'string') {
      return this.id === other;
    }
    return this.id === other.id;
  }
}
