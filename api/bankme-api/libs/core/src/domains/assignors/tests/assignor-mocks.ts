import { Sequence } from 'bme/core/sequence';
import { Assignor } from '../entities/assignor.entity';
import { cpf } from 'cpf-cnpj-validator';
import { AssignorVO } from '../vos/assignor.vo';

export class AssignorMocks {
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

  public static convertAssignorToVO(assignor: Assignor): AssignorVO {
    if (!assignor) return null;
    return new AssignorVO(
      assignor.id,
      assignor.document,
      assignor.email,
      assignor.phone,
      assignor.name,
    );
  }
}
