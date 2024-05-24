import { formatAssignorDocument } from '@helpers/format-assignor-document';
import { formatAssignorPhone } from '@helpers/format-assignor-phone';
import { Assignor } from '@modules/assignor/entities/assignor.entity';

export class HttpAssignorMapper {
  static toHttp(assignor: Assignor): any {
    return {
      id: assignor.id,
      document: formatAssignorDocument(assignor.document),
      email: assignor.email,
      phone: formatAssignorPhone(assignor.phone),
      name: assignor.name,
      payables: assignor.payables,
    };
  }
}
