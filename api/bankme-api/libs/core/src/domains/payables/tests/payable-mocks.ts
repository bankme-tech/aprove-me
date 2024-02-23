import { Sequence } from 'bme/core/sequence';
import { Payable } from '../entities/payable.entity';
import { PayableVO } from '../vos/payable.vo';
import { Assignor } from '../../assignors/entities/assignor.entity';
import { cpf } from 'cpf-cnpj-validator';

export class PayableMocks {
  public static getAll(): Payable[] {
    const payables: Payable[] = [];
    for (let i = 0; i < 3; i++) {
      const payable = new Payable();
      payable.id = Sequence.getNext();
      payable.assignorId = Sequence.getNext();
      payable.value = (i + 1) * 100;
      payable.emissionDate = new Date();
      payable.createdAt = new Date();
      payable.updateAt = new Date();
    }

    return payables;
  }

  public static getAssignor(): Assignor {
    const assignor = new Assignor();
    assignor.id = Sequence.getNext();
    assignor.document = cpf.generate();
    assignor.email = 'email@liame.com';
    assignor.phone = '(19) 98765-4321';
    assignor.name = 'Name Surname';
    assignor.createdAt = new Date();
    assignor.updateAt = new Date();
    return assignor;
  }

  public static getPayable(): Payable {
    const payable = new Payable();
    payable.id = Sequence.getNext();
    payable.assignorId = Sequence.getNext();
    payable.value = 100;
    payable.emissionDate = new Date();
    payable.createdAt = new Date();
    payable.updateAt = new Date();
    return payable;
  }

  public static convertToVO(payables: Payable[]): PayableVO[] {
    return payables.map(
      (x) => new PayableVO(x.id, x.value, x.emissionDate, x.assignorId, null),
    );
  }
}
