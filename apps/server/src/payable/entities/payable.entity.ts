import { Entity } from '@/common/entity/entity.base'
import { Optional } from '@/common/types'

export type PayableStatus =
  | 'complete'
  | 'waiting'
  | 'processing'
  | 'error'
  | 'canceled'

export interface PayableProps {
  assignorId: string
  value: number
  emissionDate?: Date | null
  status: PayableStatus
  createdAt?: Date | null
  payedAt?: Date | null
  canceledAt?: Date | null
}

export class Payable extends Entity<PayableProps> {
  get assignorId() {
    return this.props.assignorId
  }

  set assignorId(assignorId: string) {
    this.props.assignorId = assignorId
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  get emissionDate() {
    return this.props.emissionDate
  }

  set emissionDate(emissionDate: Date) {
    this.props.emissionDate = emissionDate
  }

  get status() {
    return this.props.status
  }

  set status(status: PayableStatus) {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get payedAt() {
    return this.props.payedAt
  }

  pay() {
    this.props.payedAt = new Date()
    this.props.status = 'complete'
    this.props.canceledAt = null
  }

  isPayed() {
    return Boolean(this.props.payedAt)
  }

  get canceledAt() {
    return this.props.canceledAt
  }

  cancel() {
    this.props.canceledAt = new Date()
    this.props.payedAt = null
    this.props.status = 'canceled'
  }

  isCanceled() {
    return Boolean(this.props.canceledAt)
  }

  static create(
    props: Optional<
      PayableProps,
      'createdAt' | 'canceledAt' | 'payedAt' | 'status'
    >,
    id?: string,
  ) {
    const payable = new Payable(
      {
        ...props,
        createdAt: props.emissionDate ?? new Date(),
        canceledAt: props.canceledAt ?? null,
        status: props.status ?? 'waiting',
        payedAt: props.payedAt ?? null,
      },
      id,
    )
    return payable
  }
}
