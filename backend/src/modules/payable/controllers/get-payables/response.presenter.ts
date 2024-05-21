import { PayableEntity } from '../../entities/payable.entity';

export class ResponsePresenter {
  static toHttp(raw: PayableEntity[]) {
    return raw.map((payable) => ({
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId,
    }));
  }
}
