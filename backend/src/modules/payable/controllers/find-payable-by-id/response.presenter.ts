import { PayableEntity } from '../../entities/payable.entity';

export class ResponsePresenter {
  static toHTTP(raw: PayableEntity) {
    return {
      id: raw.id,
      value: raw.value,
      emissionDate: raw.emissionDate,
      assignorId: raw.assignorId,
      assignor: {
        name: raw.assignor.name,
        email: raw.assignor.email,
        document: raw.assignor.document,
        phone: raw.assignor.phone,
      },
    };
  }
}
