import { AssignorEntity } from '../../entities/assignor.entity';

export class ResponsePresenter {
  static toHTTP(raw: AssignorEntity) {
    return {
      id: raw.id,
      name: raw.name,
      document: raw.document,
      email: raw.email,
      phone: raw.phone,
    };
  }
}
