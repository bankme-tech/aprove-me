import { Payable } from '@/payable/entities/payable.entity'

export class PayablePresenter {
  static toResponseHttp(payable: Payable) {
    return {
      id: payable.id,
      value: payable.value,
      assignorId: payable.assignorId,
      emissionDate: payable.emissionDate,
      createdAt: payable.createdAt,
      canceledAt: payable.canceledAt,
      payedAt: payable.payedAt,
      isCanceled: payable.isCanceled(),
      isPayed: payable.isPayed(),
    }
  }
}
