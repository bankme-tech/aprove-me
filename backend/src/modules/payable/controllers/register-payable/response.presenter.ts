import { PayableEntity } from '../../entities/payable.entity';

export class ResponsePresenter {
  static toHttp(raw: PayableEntity) {
    return {
      id: raw.id,
      value: raw.value,
      emissionDate: raw.emissionDate,
      assignorId: raw.assignorId,
    };
  }
}
