import { AssignorEntity } from '../../entities/assignor.entity';

export class ResponsePresenter {
  static toHttp(raw: AssignorEntity[]) {
    return raw.map((assignor) => ({
      id: assignor.id,
      name: assignor.name,
      email: assignor.email,
      document: assignor.document,
      phone: assignor.phone,
    }));
  }
}
