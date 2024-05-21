import { Payable } from '@/modules/integrations/domain/entities/payable.entity';

export class PayablesViewModel {
  public static toHTTP(payable: Payable) {
    return {
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: payable.assignor,
      createdAt: payable.createdAt,
      updatedAt: payable.updatedAt,
    };
  }
}
