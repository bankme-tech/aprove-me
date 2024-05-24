import { Payable } from '@modules/payable/entities/payable.entity';

export class HttpPayableMapper {
  static toHttp(payable: Payable) {
    return {
      id: payable.id,
      value: payable.value.toFixed(2),
      emissionDate: payable.emissionDate.toISOString(),
      assignor: payable.assignor,
    };
  }
}
